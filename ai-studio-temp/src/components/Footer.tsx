import { MapPin, Phone, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

interface FooterProps {
  darkMode: boolean;
  setCurrentTab: (tab: string) => void;
  setIsCartOpen: (open: boolean) => void;
}

export default function Footer({ darkMode, setCurrentTab, setIsCartOpen }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent("Hello ALLAH IS GREAT store, I'm visiting your website and would like to learn more about your available premium electronics!");
    window.open(`https://wa.me/231776070131?text=${message}`, '_blank');
  };

  const handleDirections = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=New+Georgia+Estate+Liberia', '_blank');
  };

  return (
    <footer className={`transition-colors duration-300 border-t ${
      darkMode 
        ? 'bg-slate-950 text-slate-350 border-slate-900' 
        : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      
      {/* Top Footer with detail sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Out Store Details */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold tracking-wider uppercase border-b-2 border-amber-500 pb-2 inline-block">
              ALLAH IS GREAT
            </h3>
            <p className="text-sm opacity-80 leading-relaxed text-slate-400">
              Your premium destination for advanced, high-quality electronics, smart systems, and household electrical solutions in Liberia. Everything under one roof.
            </p>
            <div className="space-y-3 pt-2 text-sm text-slate-350">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>New Georgia Estate, Monrovia, Liberia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <a href="tel:+231776070131" className="hover:text-amber-400 hover:underline transition-all">
                  +231776070131
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare size={16} className="text-amber-500 shrink-0" />
                <a 
                  href="https://wa.me/231776070131" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all"
                >
                  +231776070131 (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4 text-amber-500">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'products', label: 'Browse Products' },
                { id: 'about', label: 'Our Story' },
                { id: 'contact', label: 'Get In Touch' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setCurrentTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center space-x-2 text-slate-400 hover:text-amber-400 transform hover:translate-x-1 duration-200"
                  >
                    <ArrowRight size={12} className="text-amber-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trading Hours */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4 text-amber-500">
              Business Hours
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-white font-mono">10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="font-medium">Saturday</span>
                <span className="text-white font-mono">10:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5 opacity-60">
                <span className="font-medium">Sunday</span>
                <span className="text-red-400 font-semibold uppercase text-[10px] tracking-wider mt-0.5">Closed</span>
              </div>
              <div className="pt-2 text-xs text-amber-500/80 italic leading-relaxed flex items-start space-x-2">
                <Clock size={12} className="shrink-0 mt-0.5" />
                <span>Our WhatsApp Chat Support is active 24/7 to receive inquiries.</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Action Location Widget */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4 text-amber-500">
              Find Our Store
            </h4>
            
            {/* Embedded Mini stylized SVG map */}
            <div className="h-32 rounded-xl overflow-hidden shadow-inner border border-slate-800/80 relative">
              <div className="absolute inset-0 bg-slate-950 flex items-center justify-center filter brightness-90 saturate-50">
                <svg className="w-full h-full" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="100" fill="#0C1424" />
                  <line x1="0" y1="60" x2="200" y2="40" stroke="#1E293B" strokeWidth="6" />
                  <line x1="30" y1="0" x2="110" y2="100" stroke="#1E293B" strokeWidth="5" />
                  <circle cx="85" cy="45" r="3" fill="#EF4444" className="animate-ping" />
                  <circle cx="85" cy="45" r="2" fill="#EF4444" />
                  <text x="94" y="47" fill="#FFFFFF" fontSize="6" fontFamily="sans-serif" fontWeight="bold">Store Outlet</text>
                </svg>
              </div>
            </div>

            {/* Quick-action visual buttons */}
            <div className="grid grid-cols-3 gap-2">
              <a 
                href="tel:+231776070131"
                className="flex flex-col items-center justify-center p-2 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider text-center transition-all cursor-pointer shadow-md"
              >
                Call
              </a>
              <button 
                onClick={handleShareOnWhatsApp}
                className="flex flex-col items-center justify-center p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase tracking-wider text-center transition-all cursor-pointer border border-slate-700"
              >
                Chat
              </button>
              <button 
                onClick={handleDirections}
                className="flex flex-col items-center justify-center p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase tracking-wider text-center transition-all cursor-pointer border border-slate-700"
              >
                Directions
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Extreme bottom: brand copyrights */}
      <div className="bg-slate-950 py-6 border-t border-slate-900/80 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            &copy; {currentYear} <strong>ALLAH IS GREAT</strong> - Everything Electronics Under One Roof.
          </span>
          <div className="flex space-x-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500/60">New Georgia Estate, Liberia</span>
            <button 
              onClick={() => setCurrentTab('about')}
              className="hover:text-amber-400 hover:underline transition-all"
            >
              About
            </button>
            <button 
              onClick={() => setCurrentTab('contact')}
              className="hover:text-amber-400 hover:underline transition-all"
            >
              Contact
            </button>
            <button 
              onClick={() => {
                setCurrentTab('admin_login');
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-400 hover:underline transition-all font-bold text-amber-500"
            >
              Supervisor Portal
            </button>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
