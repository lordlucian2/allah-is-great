const Contact = () => {
  const phoneNumber = '+231776070131';
  const whatsappNumber = '231776070131';
  const address = 'New Georgia Estate, Liberia';
  const businessHours = 'Mon-Sat: 9am – 7pm, Sun: Closed';

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'd like to inquire about your products and services.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const getDirections = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-royalBlue text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We're here to help – reach out anytime</p>
        </div>
      </section>

      {/* Contact Info & Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-royalBlue mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700">🏪 Business Name</p>
                <p>ALLAH IS GREAT – Everything Electronics Under One Roof</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">📍 Location</p>
                <p>{address}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">📞 Phone</p>
                <a href={`tel:${phoneNumber}`} className="text-royalBlue hover:underline">{phoneNumber}</a>
              </div>
              <div>
                <p className="font-semibold text-gray-700">💬 WhatsApp</p>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-royalBlue hover:underline">+{whatsappNumber}</a>
              </div>
              <div>
                <p className="font-semibold text-gray-700">🕒 Business Hours</p>
                <p>{businessHours}</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 space-x-4">
              <a href={`tel:${phoneNumber}`} className="inline-block bg-royalBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">Call Now</a>
              <button onClick={openWhatsApp} className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">Chat on WhatsApp</button>
              <button onClick={getDirections} className="inline-block bg-darkGray hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition">Get Directions</button>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div>
            <h2 className="text-2xl font-bold text-royalBlue mb-4">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
              <iframe
                title="ALLAH IS GREAT Store Location"
                src="https://maps.google.com/maps?q=New+Georgia+Estate,+Liberia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-gray-500 text-sm mt-2">New Georgia Estate, Liberia – Exact address available on WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-royalBlue mb-4">We Respond Quickly</h2>
          <p className="text-gray-700 mb-6">Prefer WhatsApp? Most customers get a reply within minutes.</p>
          <button onClick={openWhatsApp} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Start WhatsApp Chat
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
