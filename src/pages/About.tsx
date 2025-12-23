import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import founderImage from "@/assets/founder-sunitta-swaarup.png";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Adornn Herbals</h1>
          <p className="text-2xl text-primary font-medium mb-6">"Where Nature Meets Nurture"</p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine nature's purity with time-tested methods to create safe, effective products for everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2021 by <strong className="text-foreground">Ms. Sunitta Swaarup</strong>, Adornn Herbals was born from a deeply personal journey. Between 2012 and 2014, Sunitta faced significant health challenges that led her to discover the transformative power of naturopathy and Ayurvedic techniques.
              </p>
              <p>
                Guided by the philosophy that <em>"One can do anything if they want"</em>, she dedicated herself to creating products that harness nature's healing wisdom. Today, Adornn Herbals offers 100% herbal and authentic products, free from harmful chemicals and toxins.
              </p>
              <p>
                Every product is backed by years of dedicated research and thoroughly tested for effectiveness, rooted in traditional Ayurvedic methods including the use of cold-pressed oils.
              </p>
            </div>
          </div>
          <img 
            src={founderImage} 
            alt="Ms. Sunitta Swaarup, Founder of Adornn Herbals" 
            className="rounded-lg aspect-[3/4] object-cover w-full"
          />
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">100% Herbal</h3>
              <p className="text-muted-foreground">
                All our products are made with pure, authentic herbal ingredients sourced with care.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Chemical-Free</h3>
              <p className="text-muted-foreground">
                Free from harmful chemicals and toxins, safe for your skin and body.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Research-Backed</h3>
              <p className="text-muted-foreground">
                Years of dedicated research and thorough testing ensure effectiveness.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Traditional Ayurveda</h3>
              <p className="text-muted-foreground">
                Rooted in ancient Ayurvedic methods including cold-pressed oil techniques.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Quote */}
        <div className="mb-16 bg-primary/10 rounded-lg p-8 text-center">
          <blockquote className="text-xl italic text-foreground mb-4">
            "One can do anything if they want."
          </blockquote>
          <p className="text-muted-foreground">— Ms. Sunitta Swaarup, Founder</p>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">Get In Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground">188 C, Sec-10, Vasundhara, Ghaziabad</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Call / WhatsApp</h3>
                <p className="text-muted-foreground">+91 99710 08064 | +91 82874 21522</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <a href="mailto:adornnherbal@gmail.com" className="text-primary hover:underline">
                  adornnherbal@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                <a 
                  href="https://instagram.com/adornnherbal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @adornnherbal
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
