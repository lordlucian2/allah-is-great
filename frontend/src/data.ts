import { Product, Testimonial, TeamMember } from './types';

export const CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'audio', name: 'Audio', icon: 'Headphones' },
  { id: 'computing', name: 'Computing', icon: 'Laptop' },
  { id: 'home_automation', name: 'Home Automation', icon: 'Home' },
  { id: 'electrical', name: 'Electrical', icon: 'Zap' },
  { id: 'accessories', name: 'Accessories', icon: 'Usb' },
  { id: 'fans', name: 'Fans', icon: 'Wind' },
  { id: 'chargers', name: 'Chargers', icon: 'Cable' },
  { id: 'speakers', name: 'Speakers', icon: 'Volume2' },
  { id: 'power_banks', name: 'Power Banks', icon: 'BatteryCharging' }
];

export const BRANDS = ['Samsung', 'Apple', 'Sony', 'JBL', 'Anker', 'DJI', 'ProBook', 'Others'];

export const PRODUCTS: Product[] = [
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    price: 999.00,
    originalPrice: 1199.00,
    rating: 4.8,
    reviewsCount: 156,
    category: 'smartphones',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience the absolute pinnacle of smartphone technology. The Galaxy S24 Ultra features an unparalleled titanium build, integrated S-Pen stylus, an incredible 200MP Quad-Camera setup, and high-performance Snapdragon 8 Gen 3 for Galaxy AI capabilities. This is your premium, future-proof communications companion.',
    specs: {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz, HDR10+',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Camera': '200MP Main + 50MP Periscope + 12MP Ultra-wide + 10MP Telephoto',
      'Battery': '5000mAh with 45W Fast Charging & Qi Wireless Charging',
      'Storage': '256GB / 512GB / 1TB UFS 4.0',
      'Color': 'Titanium Gray, Titanium Black, Titanium Yellow'
    },
    colors: [
      { name: 'Titanium Black', hex: '#1C1C1E' },
      { name: 'Titanium Gray', hex: '#8E8E93' },
      { name: 'Titanium Yellow', hex: '#EAE6CA' }
    ],
    isFeatured: true,
    isTodayDeal: true,
    badgeText: 'Limited Offer'
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    price: 1099.00,
    originalPrice: 1249.00,
    rating: 4.9,
    reviewsCount: 204,
    category: 'smartphones',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565849615011-314210e7b8c7?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Forged in aerospace-grade titanium, featuring the revolutionary A17 Pro chip, a customizable Action button, the most powerful iPhone camera system ever with 5x optical zoom, and ultra-fast USB-C connectivity.',
    specs: {
      'Display': '6.7" Super Retina XDR OLED, 120Hz ProMotion',
      'Processor': 'Apple A17 Pro (3nm)',
      'Camera': '48MP Main + 12MP Telephoto 5x + 12MP Ultra-wide with LiDAR',
      'Battery': '4441mAh with Fast Charging & MagSafe Wireless Charging',
      'Storage': '256GB / 512GB / 1TB',
      'Color': 'Black Titanium, White Titanium, Natural Titanium'
    },
    colors: [
      { name: 'Black Titanium', hex: '#232426' },
      { name: 'Natural Titanium', hex: '#BEBDB8' },
      { name: 'White Titanium', hex: '#F2F1ED' }
    ],
    isFeatured: true,
    isTodayDeal: true,
    badgeText: 'New Arrival'
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Headphones',
    price: 198.00,
    originalPrice: 348.00,
    rating: 4.7,
    reviewsCount: 182,
    category: 'audio',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1481207604374-8556e18af26d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Industry-leading Active Noise Canceling over-ear wireless headphones with dual noise sensor technology, V1 integrated processor, crystal-clear hands-free calling, up to 30 hours of continuous battery life, and smart voice assistant integrations.',
    specs: {
      'Type': 'Over-Ear Wireless Headphone',
      'Noise Canceling': 'Industry-leading Dual Processor ANC',
      'Drivers': '30mm High-compliance Driver Units',
      'Battery Life': 'Up to 30 Hours (ANC On) / 38 Hours (ANC Off)',
      'Bluetooth': 'v5.2, LDAC, AAC, SBC codecs supported',
      'Special Features': 'Speak-to-Chat, Quick Attention Mode, Multipoint Connection'
    },
    colors: [
      { name: 'Silver White', hex: '#EBEBEB' },
      { name: 'Black Carbon', hex: '#121212' }
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'jbl-flip-6',
    name: 'JBL Flip 6 Bluetooth Speaker',
    price: 26.00,
    originalPrice: 129.00,
    rating: 4.6,
    reviewsCount: 94,
    category: 'speakers',
    brand: 'JBL',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Deliver powerful, crystal-clear sound wherever you roam. The JBL Flip 6 features a 2-way speaker system with an optimized racetrack-shaped driver, separate tweeter, and dual pumping bass radiators. IP67 waterproof and dustproof for beach or backyard use, and up to 12 hours of total play time.',
    specs: {
      'Sound Output': '30W RMS Power Output',
      'Waterproof Standard': 'IP67 Waterproof and Dustproof',
      'Connectivity': 'Bluetooth 5.1 supporting PartyBoost link',
      'Battery playtime': 'Up to 12 Hours on single charge',
      'Charging Time': '2.5 Hours via USB-C'
    },
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'Forest Green', hex: '#2D4A3E' },
      { name: 'Squad Teal', hex: '#005D5D' }
    ],
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    badgeText: 'Best Seller'
  },
  {
    id: 'ultrabook-pro-x1',
    name: 'UltraBook Pro X1',
    price: 1499.00,
    originalPrice: 1799.00,
    rating: 4.9,
    reviewsCount: 88,
    category: 'computing',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience peak performance and stunning visuals. The ultimate tool for professionals. Equipped with the latest Intel Core i9 processor, 32GB high-frequency RAM, and an ultra-fast 2TB Solid State Drive. Enjoy the spectacular 4K Retina display with breathtaking color range and a super-thin premium metal housing.',
    specs: {
      'Display': '16.1" OLED 4K Retina Display, 120Hz',
      'Processor': 'Intel Core i9 14900H (Up to 5.4 GHz)',
      'RAM': '32GB LPDDR5 Dual Channel',
      'Storage': '2TB PCI-e Gen 4 NVMe M.2 SSD',
      'Graphics': 'NVIDIA GeForce RTX 4060 (8GB GDDR6)',
      'Battery': '20-Hour Battery Life (99Wh Li-Po)',
      'Ports': '3x Thunderbolt 4, HDMI 2.1, SDXC Slot',
      'OS': 'Windows 11 Professional pre-activated'
    },
    colors: [
      { name: 'Sleek Silver', hex: '#D2D3D5' },
      { name: 'Space Gray', hex: '#37383C' }
    ],
    isFeatured: true,
    isTodayDeal: false
  },
  {
    id: 'probook-x1-laptop',
    name: 'ProBook X1 Laptop',
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewsCount: 64,
    category: 'computing',
    brand: 'ProBook',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'High-performance workstation Laptop designed for professional developers, engineers, and digital artists. Offers a robust magnesium chassis, state-of-the-art cooling mechanisms, and an ultra-responsive mechanical feel keyboard.',
    specs: {
      'Display': '15.6" IPS Full HD, Active Anti-glare',
      'Processor': 'Intel Core i7 Professional Processor',
      'RAM': '16GB DDR5 High-Speed Dual-Channel',
      'Storage': '1TB NVMe PCIe Gen 4 SSD',
      'Graphics': 'Intel Iris Xe Graphics',
      'Battery': 'Up to 12 Hours heavy usage',
      'OS': 'Windows 11 Pro pre-installed'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: 'aura-smart-speaker',
    name: 'Aura Smart Speaker',
    price: 199.00,
    originalPrice: 249.00,
    rating: 4.5,
    reviewsCount: 36,
    category: 'home_automation',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Smart Voice-controlled desktop assistant and speaker system. Radiates immersive 360-degree high-fidelity audio while managing your home automation ecosystem effortlessly via modern AI speech processing.',
    specs: {
      'Speaker Type': '360° Omnidirectional Bass-Reflex Speaker',
      'Connectivity': 'Dual-band Wi-Fi 5 / Bluetooth 5.0',
      'Voice Assistant': 'Google Home & Alexa fully integrated',
      'Smart Hub': 'Zigbee 3.0 built-in controller',
      'Power Source': 'AC Adapter 100-240V'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: 'mirrorless-camera',
    name: 'Mirrorless Camera Pro',
    price: 150.00,
    originalPrice: 299.00,
    rating: 4.7,
    reviewsCount: 48,
    category: 'home_automation',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Ultra-compact mirrorless digital camera combining entry-level simplicity with premium picture quality. Includes a hybrid autofocus engine, 4K crisp recording capabilities, and immediate smartphone Wi-Fi photo syncing.',
    specs: {
      'Sensor': '24.2 MP APS-C High Sensitivity CMOS Sensor',
      'Auto-Focus': 'Hybrid AF with real-time Eye Autofocus',
      'Video resolution': 'Sharp 4K video capturing up to 30p',
      'Lenses': 'Standard E-mount system',
      'Weight': 'Approx. 410g body only'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    price: 150.00,
    originalPrice: 199.00,
    rating: 4.4,
    reviewsCount: 112,
    category: 'audio',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1588449668338-d15168b4a475?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1588449668338-d15168b4a475?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'TWS In-Ear headphones with advanced Noise Isolation and rich bass drivers. Enjoy zero-latency connectivity and automatic optical play/pause sensors that work the instant you sit them in your ears.',
    specs: {
      'Bluetooth Standard': 'v5.3 True Wireless Stereo core',
      'ANC Rating': 'Up to 24dB passive and active feedback',
      'Playtime': '7 Hours on single charge (total 28H with case)',
      'Waterproof': 'IPX5 Sweat resistance rating'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: 'smartwatch-4',
    name: 'SmartWatch Series 4',
    price: 150.00,
    originalPrice: 220.00,
    rating: 4.5,
    reviewsCount: 76,
    category: 'accessories',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Automate your daily life and fitness tracking. Tracks real-time heart rate variation, sleep stages, oxygen levels, and shows persistent smartphone alerts with immediate touch response.',
    specs: {
      'Screen Size': '1.78" Curved AMOLED Display always-on',
      'Durability': 'MIL-STD-810H Grade & 5ATM IP68 Waterproof',
      'Sensors': 'Optical heart rate, Bio-electrical tracker, Accelerometer',
      'Battery Life': 'Up to 5 Days in typical smart watch mode'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: '4k-monitor-curve',
    name: '4K Monitor Curved Display',
    price: 299.00,
    originalPrice: 399.00,
    rating: 4.8,
    reviewsCount: 52,
    category: 'computing',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Immersive curved workstation monitor that mimics your human field of vision. Provides true-to-life 4K UHD color rendering and an ultra-thin frame that fits clean visual layouts.',
    specs: {
      'Display Size': '31.5" Diagonally measured Curvature',
      'Resolution': '3840 x 2160 Pixels (Ultra HD)',
      'Curvature Radius': '1500R Ergonomic Curve',
      'Response Time': '4ms Gray-to-Gray',
      'Ports': '2x HDMI 2.0, DisplayPort 1.4, USB-C Power Deliver'
    },
    isFeatured: false,
    isTodayDeal: false
  },
  {
    id: 'table-fan-retro',
    name: 'Sleek Table Fan',
    price: 35.00,
    originalPrice: 49.00,
    rating: 4.3,
    reviewsCount: 22,
    category: 'fans',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1618944847023-38aa001235f0?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618944847023-38aa001235f0?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Robust, whisper-silent desk cooling fan in premium finishes. Features 3 different speed levels, a sturdy metal body, and horizontal oscillation settings to circulate refreshing air.',
    specs: {
      'Output Speed': '1350 RPM with Ultra-quiet Brushless Motor',
      'Oscillation Angle': '85° Horizontal Sweep',
      'Power Wattage': '45 Watts max power consumption'
    },
    isFeatured: true,
    isTodayDeal: false
  },
  {
    id: 'extension-socket-safeguard',
    name: 'Multi-Extension Socket Block',
    price: 150.00,
    originalPrice: 199.00,
    rating: 4.6,
    reviewsCount: 45,
    category: 'electrical',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Safeguard your valuable electronics with heavy-duty surge-protected power strips. Features 5 universal power outlets with safety shutters, custom switches, and dual fast USB charging slots.',
    specs: {
      'Surge rating': '1200 Joules protective block',
      'Sockets': '5 Universal Socket Plugs + 2 USB-A Slots',
      'Cable length': '3-meter heavy gauge copper cable'
    },
    isFeatured: true,
    isTodayDeal: false
  },
  {
    id: 'fast-afl-chargers',
    name: 'Fast AFL Chargers Plug Set',
    price: 25.00,
    originalPrice: 39.00,
    rating: 4.7,
    reviewsCount: 118,
    category: 'chargers',
    brand: 'Others',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'High-speed PD Type-C power charger block. Comes complete with a thick, robust 2-meter fast-charge cable ideal for charging iPhones, iPads, and high-spec Android flagships in record time.',
    specs: {
      'Charger Type': 'Dual Port Power-Delivery Charger Block',
      'Wattage Output': '35 Watts PPS Charger Speed',
      'Cable Type': '2-Meter braided USB-C to USB-C heavy-duty cable'
    },
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    badgeText: 'Best Seller'
  },
  {
    id: 'anker-power-bank',
    name: 'Anker 737 Power Bank Pro',
    price: 150.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviewsCount: 140,
    category: 'power_banks',
    brand: 'Anker',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Ultra-high-capacity massive power bank with dynamic digital display. Charges laptops, tablets, and phones at record speeds using the advanced GaNPrime energy delivery system.',
    specs: {
      'Capacity': '24,000 mAh High density cells',
      'Max Output': '140W Bidirectional USB Power Delivery 3.1',
      'Ports': '2x USB-C fast ports, 1x USB-A outlet',
      'Display': 'Smart digital display showing watts, temps, and percentage'
    },
    isFeatured: false,
    isBestSeller: false,
    isTodayDeal: true,
    badgeText: 'Limited Offer'
  },
  {
    id: 'dji-mini-drone',
    name: 'DJI Mini 4 Pro Drone',
    price: 139.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewsCount: 72,
    category: 'accessories',
    brand: 'DJI',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience flying from above with the world’s most advanced sub-249g ultra-portable drone. Offers 4K HDR vertical video capturing, omnidirectional obstacle sensing, and up to 34 minutes of flight duration on a single charge.',
    specs: {
      'Weight': '249 grams - No FAA registration required',
      'Camera': '1/1.3-inch CMOS Sensor, Dual Native ISO Fusion',
      'Video': '4K HDR at 60fps / 4K slow motion at 100fps',
      'Range': 'Up to 20 Kilometers FHD Video Transmission'
    },
    isFeatured: true,
    isBestSeller: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Eric V. Kremah',
    rating: 5,
    text: 'Your source for high-quality experience is unmatched in product quality and solutions. ALLAH IS GREAT has consistently provided reliable customer service and outstanding technical support.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Michael Lee',
    rating: 5,
    text: 'This brand helps us control our office power structures with surge protector panels of ultimate safety and security. Extreme durability, we highly recommend purchasing from Michael Lee.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Jane Smith',
    rating: 5,
    text: 'I purchased the Sony WH-1000XM5 headphones. The sound cancellation is phenomenal and the customer support team guided me perfectly throughout the checkout. Very friendly store!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80'
  },
  {
    id: 'test-4',
    name: 'John Doe',
    rating: 5,
    text: 'Superb quality electronics. Truly authentic goods. I got an iPhone 15 Pro, and it was perfectly packed and delivered with care. Five stars for the service!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alhajie S. Barry',
    role: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80'
  },
  {
    id: 'team-2',
    name: 'Jane Smith',
    role: 'Technical Operations Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80'
  },
  {
    id: 'team-3',
    name: 'Mohammed Diallo',
    role: 'Customer Service Manager',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80'
  },
  {
    id: 'team-4',
    name: 'Serith Wanghon',
    role: 'Lead Electrical Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80'
  }
];
