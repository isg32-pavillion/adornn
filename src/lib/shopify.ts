import { toast } from "sonner";
import { productImageMap } from "@/data/products";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-m5qu5.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '17ee754a632e2bc2c4b4f4d7162b3d7e';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    productType: string;
    vendor: string;
    tags: string[];
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Your store needs to be upgraded to a paid plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchShopifyProducts(limit: number = 50): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: limit });
    
    if (!data || !data.data) {
      return [];
    }

    return data.data.products.edges || [];
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    toast.error('Failed to fetch products from Shopify');
    return [];
  }
}

// Convert Shopify product to our Product interface
export function convertShopifyProduct(shopifyProduct: ShopifyProduct, category: string = "Body Care") {
  const { node } = shopifyProduct;
  
  // Extract numeric ID from GraphQL ID
  const id = node.id.split('/').pop() || node.handle;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  
  // Get image from our mapping or use first Shopify image or placeholder
  const productImage = productImageMap[node.handle] || 
    node.images.edges[0]?.node.url || 
    "/placeholder.svg";
  
  // Determine room based on product type
  let room = "Bath & Body";
  if (node.productType.toLowerCase().includes("hair")) {
    room = "Hair Care";
  } else if (node.productType.toLowerCase().includes("skin")) {
    room = "Skincare";
  } else if (node.productType.toLowerCase().includes("wellness")) {
    room = "Wellness";
  }
  
  // Determine styles based on tags
  const styles: string[] = [];
  node.tags.forEach((tag: string) => {
    const normalizedTag = tag.toLowerCase();
    if (normalizedTag.includes("natural") || normalizedTag.includes("herbal")) {
      styles.push("Natural");
    }
    if (normalizedTag.includes("ayurvedic")) {
      styles.push("Relaxing");
    }
    if (normalizedTag.includes("anti-aging") || normalizedTag.includes("repair")) {
      styles.push("Clinical");
    }
  });
  
  if (styles.length === 0) {
    styles.push("Effective");
  }
  
  return {
    id,
    name: node.title,
    price,
    image: productImage,
    category: node.productType || category,
    room,
    style: styles,
    description: node.description || "",
    rating: 5.0, // Default rating
    reviews: 2, // Default review count
    inStock: node.variants.edges.some(v => v.node.availableForSale),
    isNew: node.tags.includes("new"),
    isBestseller: node.tags.includes("bestseller"),
  };
}
