const About = () => {
  const whatsappNumber = '231776070131';

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'd like to know more about your store and services.")}`, '_blank');
  };

  const services = [
    '📱 Electronics Sales',
    '⚡ Electrical Supplies',
    '💬 Product Consultation',
    '📦 Bulk Orders',
    '🔧 Installation Support',
    '🛡️ Warranty Assistance'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-royalBlue text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Your trusted electronics & electrical partner in Liberia</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-royalBlue mb-4">Our Story</h2>
            <p className="mb-4 text-gray-700">
              <strong>ALLAH IS GREAT</strong> started as a small electronics shop in New Georgia Estate, Liberia, with a simple mission: to provide genuine, high-quality electronics and electrical supplies at affordable prices.
            </p>
            <p className="mb-4 text-gray-700">
              Over the years, we have grown into a trusted destination for homeowners, students, small businesses, contractors, and electricians. Our commitment to customer satisfaction, fast WhatsApp responses, and authentic products has earned us a loyal customer base.
            </p>
            <p className="text-gray-700">
              We believe that everyone deserves access to reliable electronics without breaking the bank. That's why we carefully select our products and offer competitive prices without compromising on quality.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 md:h-96 overflow-hidden shadow-lg">
            <img 
              src="https://placehold.co/800x600/0D47A1/white?text=Interior+Store+Photo" 
              alt="Store interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-royalBlue mb-3">Our Mission</h3>
              <p className="text-gray-700">To empower our community with affordable, genuine electronics and exceptional customer service, making technology accessible to everyone in Liberia.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-royalBlue mb-3">Customer Philosophy</h3>
              <p className="text-gray-700">Every customer is treated like family. We listen, advise honestly, and ensure you get the right product for your needs – always with a smile and fast WhatsApp support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Photos Gallery */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-royalBlue text-center mb-8">Our Store</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://placehold.co/600x400/FF6F00/white?text=Exterior+Storefront" 
              alt="Store exterior" 
              className="w-full h-64 object-cover"
            />
            <p className="text-center mt-2 text-gray-600">Exterior – New Georgia Estate, Liberia</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://placehold.co/600x400/0D47A1/white?text=Interior+Shop" 
              alt="Store interior" 
              className="w-full h-64 object-cover"
            />
            <p className="text-center mt-2 text-gray-600">Interior – Wide product selection</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-royalBlue text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white text-darkGray p-4 rounded-lg text-center shadow hover:shadow-lg transition">
                <p className="text-lg font-semibold">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-royalBlue mb-4">Visit Us or Chat on WhatsApp</h2>
        <p className="text-gray-700 mb-6">Have questions? We're just a message away.</p>
        <div className="space-x-4">
          <button onClick={openWhatsApp} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">Chat on WhatsApp</button>
          <a href="tel:+231776070131" className="bg-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition inline-block">Call Now</a>
        </div>
      </section>
    </div>
  );
};

export default About;
