import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using the Adornn Herbals website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes."
      ]
    },
    {
      title: "Use of Our Services",
      content: [
        "You must be at least 18 years old to make purchases on our website.",
        "You agree to provide accurate, current, and complete information when creating an account or making a purchase.",
        "You are responsible for maintaining the confidentiality of your account information and password.",
        "You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our website."
      ]
    },
    {
      title: "Products and Pricing",
      content: [
        "All product descriptions, images, and specifications are provided for informational purposes and may not be completely accurate.",
        "Prices are subject to change without notice, but price changes will not affect orders already placed.",
        "We reserve the right to limit quantities, refuse orders, or discontinue products at our discretion.",
        "All sales are in Indian Rupees (INR), and applicable taxes will be added to orders where required by law."
      ]
    },
    {
      title: "Orders and Payment",
      content: [
        "Placing an order constitutes an offer to purchase products subject to these terms.",
        "We reserve the right to accept or decline your order for any reason, including product availability and payment verification.",
        "Payment is due at the time of order, and we accept major credit/debit cards, UPI, net banking, and other approved payment methods.",
        "You authorize us to charge your chosen payment method for the total amount of your order, including applicable taxes and shipping."
      ]
    },
    {
      title: "Shipping and Delivery",
      content: [
        "We ship across India and will make reasonable efforts to ship orders within the timeframes specified.",
        "Delivery dates are estimates only and may vary based on location and circumstances.",
        "Shipping costs are calculated based on weight, dimensions, destination, and selected shipping method.",
        "Free shipping is available on orders above ₹2500.",
        "We are not responsible for delays caused by shipping carriers, weather, or other circumstances beyond our control."
      ]
    },
    {
      title: "Returns and Refunds",
      content: [
        "Returns must be initiated within 7 days of delivery and products must be unopened and unused.",
        "Products that have been opened or used cannot be returned unless defective.",
        "Contact us via email or WhatsApp to initiate a return request.",
        "Refunds will be processed to the original payment method within 5-7 business days of receiving the returned item."
      ]
    },
    {
      title: "Product Information",
      content: [
        "Our products are 100% herbal and made with authentic Ayurvedic formulations.",
        "While our products are free from harmful chemicals, we recommend performing a patch test before first use.",
        "Individual results may vary. Product claims are based on traditional Ayurvedic knowledge and customer testimonials.",
        "Consult a healthcare professional if you have specific skin or hair concerns before using our products."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "All content on our website, including text, images, logos, and designs, is protected by copyright and other intellectual property laws.",
        "You may not reproduce, distribute, or create derivative works from our content without written permission.",
        "The Adornn Herbals name, logo, and product names are trademarks of Adornn Herbals.",
        "Any feedback or suggestions you provide may be used by us without compensation or attribution."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "Our liability for any claim related to products or services is limited to the purchase price of the specific product or service.",
        "We are not liable for indirect, incidental, consequential, or punitive damages arising from your use of our services.",
        "Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you."
      ]
    },
    {
      title: "Governing Law and Disputes",
      content: [
        "These terms are governed by the laws of India without regard to conflict of law principles.",
        "Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts in Ghaziabad, Uttar Pradesh, India.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect."
      ]
    },
    {
      title: "Contact Information",
      content: [
        "If you have questions about these Terms of Service, please contact us:",
        "Email: adornnherbal@gmail.com",
        "Phone/WhatsApp: +91 99710 08064 | +91 82874 21522",
        "Address: 188 C, Sec-10, Vasundhara, Ghaziabad"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground mb-8">
            These terms govern your use of Adornn Herbals website and services. Please read them carefully.
          </p>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 1, 2025 | Last Updated: January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Questions About These Terms?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              We're here to help clarify any questions you may have about our terms of service. Don't hesitate to reach out to our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:adornnherbal@gmail.com" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                adornnherbal@gmail.com
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a 
                href="tel:+919971008064" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                +91 99710 08064
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;