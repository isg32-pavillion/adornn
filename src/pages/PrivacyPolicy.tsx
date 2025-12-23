import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, make a purchase, or contact us, we collect information such as your name, email address, phone number, billing and shipping addresses, and payment information.",
        "Usage Information: We automatically collect information about how you use our website, including your IP address, browser type, device information, pages visited, and time spent on our site.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze website traffic."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders, including shipping and customer service",
        "Communicate with you about your orders, account, and promotional offers",
        "Improve our website, products, and services based on your feedback and usage patterns",
        "Personalize your shopping experience with relevant product recommendations",
        "Prevent fraud and enhance the security of our website",
        "Comply with legal obligations and protect our rights"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "Service Providers: We share information with trusted third-party service providers who help us operate our business, such as payment processors, shipping companies, and marketing platforms.",
        "Legal Requirements: We may disclose information when required by law, court order, or government regulation, or to protect our rights and safety.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.",
        "We do not sell, rent, or trade your personal information to third parties for their marketing purposes."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission and secure servers for data storage.",
        "Access to your personal information is restricted to authorized personnel who need it to perform their job functions.",
        "While we strive to protect your information, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Account Information: You can update your account information at any time by logging into your account or contacting us.",
        "Marketing Communications: You can opt out of promotional emails by clicking the unsubscribe link in any email or contacting us directly.",
        "Cookies: You can control cookie preferences through your browser settings, though this may affect website functionality.",
        "Data Deletion: You can request deletion of your personal information, subject to certain legal and business requirements."
      ]
    },
    {
      title: "Third-Party Links",
      content: [
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.",
        "We encourage you to review the privacy policies of any third-party websites you visit."
      ]
    },
    {
      title: "Children's Privacy",
      content: [
        "Our website is not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly."
      ]
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
        "We will notify you of significant changes by posting the updated policy on our website and updating the effective date.",
        "Your continued use of our website after any changes constitutes acceptance of the updated policy."
      ]
    },
    {
      title: "Contact Us",
      content: [
        "If you have questions about this Privacy Policy or our data practices, please contact us:",
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
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
            <CardTitle className="text-center">Questions About Your Privacy?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              We're committed to transparency and protecting your privacy. If you have any questions or concerns about how we handle your data, please don't hesitate to reach out.
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

export default PrivacyPolicy;