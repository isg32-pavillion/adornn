const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">About Pure Bliss Body</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves radiant skin and wellness, regardless of budget. Our mission is to make premium body care accessible to all.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024, Pure Bliss Body was born from a simple belief: premium skincare and body care shouldn't be reserved for those with unlimited budgets. We started as a small team of wellness enthusiasts who were frustrated by the lack of affordable, effective body care products.
              </p>
              <p>
                Today, we work directly with dermatologists, formulation experts, and trusted brands to curate a collection of effective, luxurious products that don't compromise on quality or results. Every product in our collection is carefully tested and selected.
              </p>
              <p>
                We're more than just a retailer – we're your wellness partner, helping you discover products that nourish your skin and elevate your self-care routine.
              </p>
            </div>
          </div>
          <img 
            src="/team-photo.jpg" 
            alt="Pure Bliss Body team working together in modern wellness studio" 
            className="rounded-lg aspect-square object-cover w-full"
          />
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Clean Ingredients</h3>
              <p className="text-muted-foreground">
                Premium skincare should be accessible to everyone, with clean, effective ingredients that deliver real results.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Dermatologist Tested</h3>
              <p className="text-muted-foreground">
                We never compromise on safety. Every product is dermatologist tested and formulated for real skin.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Cruelty-Free</h3>
              <p className="text-muted-foreground">
                We prioritize ethical practices and work only with brands that share our commitment to cruelty-free beauty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;