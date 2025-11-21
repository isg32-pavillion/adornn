import heroImage from "@/assets/hero-living-room.jpg";
import lampImage from "@/assets/product-lamp.jpg";
import pillowImage from "@/assets/product-pillow.jpg";
import vaseImage from "@/assets/product-vase.jpg";
import artworkImage from "@/assets/product-artwork.jpg";
import officeDeskLampImage from "@/assets/office-desk-lamp.jpg";
import officeOrganizerImage from "@/assets/office-organizer.jpg";
import bedroomBeddingImage from "@/assets/bedroom-bedding.jpg";
import bedroomLampImage from "@/assets/bedroom-lamp.jpg";
import kitchenCanistersImage from "@/assets/kitchen-canisters.jpg";
import kitchenCuttingBoardImage from "@/assets/kitchen-cutting-board.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  room: string;
  style: string[];
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Lavender Dreams Body Butter",
    price: 24.99,
    originalPrice: 34.99,
    image: lampImage,
    category: "Body Care",
    room: "Bath & Body",
    style: ["Relaxing", "Natural"],
    description: "Ultra-rich body butter infused with pure lavender essential oil and shea butter. Deeply moisturizes and soothes skin while promoting relaxation.",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Vitamin C Brightening Serum",
    price: 38.99,
    image: pillowImage,
    category: "Skincare",
    room: "Skincare",
    style: ["Clinical", "Effective"],
    description: "Potent vitamin C serum that brightens complexion and reduces dark spots. Lightweight formula absorbs quickly for radiant, even-toned skin.",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Rose Hydrating Face Mist",
    price: 18.99,
    image: vaseImage,
    category: "Skincare",
    room: "Skincare",
    style: ["Hydrating", "Refreshing"],
    description: "Organic rose water face mist that instantly hydrates and refreshes. Perfect for setting makeup or a midday pick-me-up.",
    rating: 4.7,
    reviews: 203,
    inStock: true,
  },
  {
    id: "4",
    name: "Argan Oil Hair Mask",
    price: 32.99,
    originalPrice: 42.99,
    image: artworkImage,
    category: "Hair Care",
    room: "Hair Care",
    style: ["Nourishing", "Repair"],
    description: "Deep conditioning hair mask enriched with pure Moroccan argan oil. Repairs damage and restores shine for silky, healthy hair.",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "5",
    name: "Eucalyptus Shower Steamers",
    price: 19.99,
    originalPrice: 26.99,
    image: officeDeskLampImage,
    category: "Bath",
    room: "Bath & Body",
    style: ["Aromatherapy", "Spa"],
    description: "Set of 6 eucalyptus shower steamers that transform your shower into a spa experience. Clears sinuses and promotes relaxation.",
    rating: 4.7,
    reviews: 94,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "6",
    name: "Bamboo Facial Cleansing Brush",
    price: 16.99,
    image: officeOrganizerImage,
    category: "Tools",
    room: "Skincare",
    style: ["Eco-Friendly", "Gentle"],
    description: "Sustainable bamboo facial brush with soft bristles for gentle exfoliation. Improves circulation and reveals brighter, smoother skin.",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    isNew: true,
  },
  {
    id: "7",
    name: "Collagen Boosting Night Cream",
    price: 45.99,
    originalPrice: 62.99,
    image: bedroomBeddingImage,
    category: "Skincare",
    room: "Skincare",
    style: ["Anti-Aging", "Luxurious"],
    description: "Premium night cream with peptides and retinol that boosts collagen production. Wake up to firmer, more youthful-looking skin.",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "8",
    name: "Detoxifying Charcoal Face Mask",
    price: 22.99,
    image: bedroomLampImage,
    category: "Skincare",
    room: "Skincare",
    style: ["Purifying", "Deep-Clean"],
    description: "Activated charcoal face mask that draws out impurities and minimizes pores. Clay-based formula leaves skin refreshed and balanced.",
    rating: 4.6,
    reviews: 112,
    inStock: true,
  },
  {
    id: "9",
    name: "Coconut Milk Bath Soak",
    price: 28.99,
    image: kitchenCanistersImage,
    category: "Bath",
    room: "Bath & Body",
    style: ["Soothing", "Creamy"],
    description: "Luxurious bath soak with coconut milk and essential oils. Creates a creamy, moisturizing bath that softens skin and calms the mind.",
    rating: 4.7,
    reviews: 143,
    inStock: true,
    isNew: true,
  },
  {
    id: "10",
    name: "CBD Wellness Roll-On",
    price: 34.99,
    image: kitchenCuttingBoardImage,
    category: "Wellness",
    room: "Wellness",
    style: ["Therapeutic", "Relief"],
    description: "Premium CBD-infused roll-on for targeted relief. Perfect for muscle tension and promoting overall relaxation and well-being.",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
];

export const collections = [
  {
    name: "Self-Care Essentials",
    description: "Curated products to elevate your daily routine",
    productIds: ["1", "2", "3", "4"],
    image: heroImage,
  },
  {
    name: "New Arrivals",
    description: "Fresh finds for radiant skin and wellness",
    productIds: ["2", "6", "9"],
    image: heroImage,
  },
  {
    name: "Bestsellers",
    description: "Customer favorites that deliver real results",
    productIds: ["1", "4", "7"],
    image: heroImage,
  },
];

export const styleQuizOptions = {
  question1: {
    question: "What's your ideal self-care routine?",
    options: [
      { id: "a", text: "Long bath with aromatherapy", styles: ["Relaxing", "Spa"] },
      { id: "b", text: "Quick but effective routine", styles: ["Clinical", "Effective"] },
      { id: "c", text: "Natural and organic products", styles: ["Natural", "Eco-Friendly"] },
      { id: "d", text: "Luxury treatments and indulgence", styles: ["Luxurious", "Anti-Aging"] },
    ],
  },
  question2: {
    question: "Your main skincare concern:",
    options: [
      { id: "a", text: "Hydration and glow", styles: ["Hydrating", "Refreshing"] },
      { id: "b", text: "Anti-aging and firmness", styles: ["Anti-Aging", "Luxurious"] },
      { id: "c", text: "Clear and balanced skin", styles: ["Purifying", "Deep-Clean"] },
      { id: "d", text: "Brightness and even tone", styles: ["Clinical", "Effective"] },
    ],
  },
  question3: {
    question: "Your wellness priority:",
    options: [
      { id: "a", text: "Relaxation and stress relief", styles: ["Relaxing", "Aromatherapy"] },
      { id: "b", text: "Hair health and shine", styles: ["Nourishing", "Repair"] },
      { id: "c", text: "Body care and moisturizing", styles: ["Soothing", "Creamy"] },
      { id: "d", text: "Holistic wellness and balance", styles: ["Therapeutic", "Relief"] },
    ],
  },
};

export const getProductsByStyle = (styles: string[]): Product[] => {
  return products.filter(product => 
    product.style.some(style => styles.includes(style))
  );
};