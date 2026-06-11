import { useState } from 'react';
import { ZoomIn, ZoomOut, MapPin, Globe, Compass, Layers } from 'lucide-react';

interface InteractiveMapProps {
  darkModeState: boolean;
}

export default function InteractiveMap({ darkModeState }: InteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(2); // 1 to 4
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [showLocationPulser, setShowLocationPulser] = useState(true);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 1));

  // Determine offsets based on zoom level to "simulate" zooming
  const zoomScale = zoomLevel === 1 ? 0.7 : zoomLevel === 2 ? 1 : zoomLevel === 3 ? 1.4 : 2;

  // Let's draw structured SVG elements to represent the map!
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/80 aspect-video w-full bg-slate-100 dark:bg-slate-950">
      
      {/* Map Content Layer */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out flex items-center justify-center select-none"
        style={{ transform: `scale(${zoomScale})` }}
      >
        {mapType === 'streets' ? (
          // STREET MAP DESIGN
          <svg className="w-full h-full min-w-[600px] min-h-[350px] opacity-90 transition-all" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="350" fill={darkModeState ? "#0B0F19" : "#EBF0ED"} />
            
            {/* Green Parks/Areas */}
            <path d="M 50,0 Q 150,120 180,210 T 260,350 L 0,350 L 0,0 Z" fill={darkModeState ? "#12201C" : "#D2E7D6"} opacity="0.8" />
            <path d="M 400,100 Q 480,180 580,140 L 600,140 L 600,0 L 400,0 Z" fill={darkModeState ? "#12201C" : "#D2E7D6"} opacity="0.6" />
            <path d="M 500,280 Q 560,300 600,290 L 600,350 L 480,350 Z" fill={darkModeState ? "#12201C" : "#D2E7D6"} opacity="0.7" />

            {/* Blue River water */}
            <path d="M 450,0 Q 420,80 430,160 T 520,270 T 490,350" stroke={darkModeState ? "#1A2E44" : "#A5C9EB"} strokeWidth="45" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
            
            {/* Styled grid network */}
            {/* Main Road - Gardnersville Rd */}
            <path d="M 0,220 L 600,120" stroke={darkModeState ? "#262C3A" : "#FFFFFF"} strokeWidth="22" strokeLinecap="round" />
            <path d="M 0,220 L 600,120" stroke={darkModeState ? "#EAB308" : "#FBBF24"} strokeWidth="12" strokeDasharray="6,4" strokeLinecap="round" />

            {/* Adban Street */}
            <path d="M 120,50 L 420,320" stroke={darkModeState ? "#2B3448" : "#FFFFFF"} strokeWidth="16" strokeLinecap="round" />
            <path d="M 120,50 L 420,320" stroke={darkModeState ? "#475569" : "#CBD5E1"} strokeWidth="6" strokeLinecap="round" />

            {/* Aâhan Street */}
            <path d="M 280,30 L 330,340" stroke={darkModeState ? "#2B3448" : "#FFFFFF"} strokeWidth="14" strokeLinecap="round" />
            <path d="M 280,30 L 330,340" stroke={darkModeState ? "#475569" : "#CBD5E1"} strokeWidth="4" strokeLinecap="round" />

            {/* Secondary blocks */}
            <line x1="50" y1="100" x2="200" y2="80" stroke={darkModeState ? "#222736" : "#E2E8F0"} strokeWidth="8" />
            <line x1="220" y1="180" x2="350" y2="160" stroke={darkModeState ? "#222736" : "#E2E8F0"} strokeWidth="8" />
            <line x1="450" y1="80" x2="550" y2="120" stroke={darkModeState ? "#222736" : "#E2E8F0"} strokeWidth="8" />

            {/* Street labels */}
            <text x="80" y="240" fill={darkModeState ? "#94A3B8" : "#475569"} fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-9, 80, 240)">GARDNERSVILLE RD</text>
            <text x="180" y="110" fill={darkModeState ? "#94A3B8" : "#475569"} fontSize="8" fontWeight="medium" fontFamily="sans-serif" transform="rotate(42, 180, 110)">Adban St</text>
            <text x="325" y="160" fill={darkModeState ? "#94A3B8" : "#475569"} fontSize="8" fontWeight="medium" fontFamily="sans-serif" transform="rotate(82, 325, 160)">Aâhan St</text>

            {/* Custom Buildings */}
            <rect x="230" y="125" width="22" height="15" rx="2" fill={darkModeState ? "#E2E8F0" : "#1E293B"} opacity="0.8" />
            
            {/* The Store Point Pin - ALLAH IS GREAT ELECTRONICS */}
            <g id="map-marker-group" className="cursor-pointer">
              {showLocationPulser && (
                <circle cx="241" cy="132" r="14" fill="#EF4444" opacity="0.3">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx="241" cy="132" r="5" fill="#EF4444" />
              <rect x="255" y="118" width="130" height="34" rx="4" fill={darkModeState ? "#1E293B" : "#FFFFFF"} stroke="#EF4444" strokeWidth="1" />
              <text x="261" y="130" fill={darkModeState ? "#FFFFFF" : "#0F172A"} fontSize="8" fontWeight="black" fontFamily="sans-serif">ALLAH IS GREAT</text>
              <text x="261" y="140" fill="#EF4444" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Electronics & Electrical</text>
            </g>
          </svg>
        ) : (
          // SATELLITE MAP DESIGN
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" 
              className="w-full h-full object-cover filter brightness-75 contrast-125 saturate-100" 
              alt="Satellite layout"
            />
            {/* Superimposed streets & pin on satellite */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,220 L 600,120" stroke="#FBBF24" strokeWidth="3" opacity="0.6" />
              <path d="M 120,50 L 420,320" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
              <circle cx="241" cy="132" r="16" fill="#EF4444" opacity="0.3">
                <animate attributeName="r" values="8;20;8" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="241" cy="132" r="6" fill="#EF4444" />
              <rect x="250" y="118" width="120" height="28" rx="3" fill="#111827" fillOpacity="0.85" stroke="#EF4444" strokeWidth="1" />
              <text x="256" y="130" fill="#FFFFFF" fontSize="8" fontWeight="black" fontFamily="sans-serif">ALLAH IS GREAT</text>
              <text x="256" y="139" fill="#EAB308" fontSize="7" fontFamily="sans-serif">Electronics Store</text>
            </svg>
          </div>
        )}
      </div>

      {/* Floating control buttons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <button 
          onClick={handleZoomIn}
          className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-sm transition-all focus:outline-none"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-sm transition-all focus:outline-none"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
      </div>

      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm transition-all focus:outline-none ${
            mapType === 'satellite'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-855 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950'
          }`}
        >
          <Layers size={13} />
          <span>{mapType === 'streets' ? 'Satellite View' : 'Street Map'}</span>
        </button>
        <button 
          onClick={() => {
            // Trigger animation or zoom right to target
            setZoomLevel(3);
            setShowLocationPulser(true);
          }}
          className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-sm transition-all focus:outline-none"
          title="Recenter Map"
        >
          <Compass size={16} />
        </button>
      </div>

      {/* Floating Info card */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 dark:bg-slate-900/95 p-3 rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm text-xs text-slate-700 dark:text-slate-350">
        <div className="flex items-center space-x-2 mb-1">
          <MapPin size={14} className="text-red-500 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">New Georgia Estate, Liberia</span>
        </div>
        <p className="leading-relaxed opacity-90 leading-normal">
          Located opposite Adban Street block. Our main outlet hosts all available smartphones, electrical adapters, and laptops.
        </p>
      </div>
    </div>
  );
}
