import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a helpful friendly tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const defaultText = "Hello ALLAH IS GREAT store! I would like to make an inquiry details regarding your premium electronics.";
    const link = `https://wa.me/231776070131?text=${encodeURIComponent(defaultText)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
      {/* Friendly welcome tooltip */}
      {showTooltip && (
        <div className="mb-3 mr-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl max-w-xs animate-bounce relative text-xs flex items-start space-x-2">
          <div className="flex-1">
            <p className="font-bold text-slate-900 dark:text-white">Need help? Chat with Us</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Inquire about product availability, delivery, or custom orders instantly on WhatsApp!
            </p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={12} />
          </button>
          
          {/* Small Speech triangle indicator */}
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800 transform rotate-45"></div>
        </div>
      )}

      {/* Floating green WhatsApp bubble */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer focus:outline-none"
        title="Chat on WhatsApp (+231776070131)"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full h-full w-full bg-[#25D366] opacity-40 group-hover:animate-ping -z-10"></span>
        
        {/* Custom Whatsapp Icon drawing via standard elements or simple elegant MessageSquare */}
        {/* We use a SVG circle/tail look for full-fidelity WhatsApp brand layout */}
        <svg 
          viewBox="0 0 24 24" 
          width="26" 
          height="26" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
          className="transform hover:rotate-12 transition-transform duration-300"
        >
          <path d="M12.012 2c-5.506 0-9.988 4.463-9.988 9.95 0 1.99.585 3.844 1.597 5.417L2.1 22l4.887-1.558c1.558 1.01 3.42 1.6 5.432 1.6h.005c5.506 0 10.008-4.463 10.008-9.95C22.432 6.463 17.518 2 12.012 2zm5.722 14.18c-.244.67-.1.115-1.026 1.15-.815.912-1.765 1.15-2.825.867-2.617-.7-.435-.115-5.323-5.26-1.577-1.657-2.222-3.327-1.653-4.502.436-.9 1.144-.925 1.684-.962l.244-.012c.315-.013.626-.025.836.436l.732 1.765c.162.388.1.75-.125 1.135-.11.19-.244.4-.383.565-.18.2-.4.434-.234.733a7.48 7.48 0 0 0 2.215 2.113 6.94 6.94 0 0 0 2.766 1.488c.394.135.613-.025.867-.288.225-.237.74-.848.988-1.185.225-.3.51-.237.89-.088l1.79.836c.395.176.65.289.776.5.125.213.125.763-.12 1.43z"/>
        </svg>
      </button>
    </div>
  );
}
