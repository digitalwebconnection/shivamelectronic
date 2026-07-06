import type { Product } from '../types';

export const categories = [
  {
    name: 'Laptops & Computers',
    slug: 'laptops',
    description: 'High-performance laptops, desktops, and computing accessories.',
    icon: 'Laptop',
    featured: ['MacBook Pro M3', 'Dell XPS 15', 'Asus ROG Zephyrus']
  },
  {
    name: 'Smartphones & Tablets',
    slug: 'smartphones',
    description: 'Latest iOS and Android devices with advanced camera tech.',
    icon: 'Smartphone',
    featured: ['iPhone 15 Pro', 'Galaxy S24 Ultra', 'iPad Pro M2']
  },
  {
    name: 'Audio & Headphones',
    slug: 'audio',
    description: 'Noise-cancelling headphones, true wireless earbuds, and speakers.',
    icon: 'Headphones',
    featured: ['Sony WH-1000XM5', 'Bose QC Ultra', 'AirPods Pro 2']
  },
  {
    name: 'Smartwatches & Wearables',
    slug: 'wearables',
    description: 'Fitness trackers, smartwatches, and lifestyle wearables.',
    icon: 'Watch',
    featured: ['Apple Watch Ultra', 'Galaxy Watch 6', 'Garmin Fenix 7']
  },
  {
    name: 'Cameras & Imaging',
    slug: 'cameras',
    description: 'Professional mirrorless cameras, lenses, and action cams.',
    icon: 'Camera',
    featured: ['Sony A7 IV', 'Fujifilm X-T5', 'GoPro Hero 12']
  },
  {
    name: 'Gaming & Accessories',
    slug: 'gaming',
    description: 'Consoles, mechanical keyboards, gaming mice, and VR headsets.',
    icon: 'Gamepad2',
    featured: ['PlayStation 5', 'Keychron Q1', 'Logitech G Pro X']
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Apple MacBook Pro 16" M3 Max',
    category: 'laptops',
    price: 3499.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    description: 'The ultimate professional laptop. Supercharged by the M3 Max chip with a 16-core CPU and 40-core GPU, stunning Liquid Retina XDR display, and up to 22 hours of battery life.',
    specifications: ['Apple M3 Max Chip', '36GB Unified Memory', '1TB Superfast SSD', '16.2-inch Liquid Retina XDR'],
    isHot: true
  },
  {
    id: 'p2',
    name: 'Apple iPhone 15 Pro Max',
    category: 'smartphones',
    price: 1199.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600',
    description: 'Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, the most powerful iPhone camera system ever, and USB-C.',
    specifications: ['A17 Pro Chip with 6-core GPU', 'Titanium design', '5x Telephoto Camera', '6.7-inch Super Retina XDR'],
    isNew: true
  },
  {
    id: 'p3',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'audio',
    price: 398.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    description: 'Industry-leading noise cancellation. With two processors controlling eight microphones, Auto NC Optimizer, and exceptional call quality.',
    specifications: ['Industry-leading Noise Cancelling', '30-hour battery life', 'Crystal-clear hands-free calling', 'Multipoint connection']
  },
  {
    id: 'p4',
    name: 'Apple Watch Ultra 2 GPS + Cellular',
    category: 'wearables',
    price: 799.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    description: 'The ultimate sports and adventure watch. Featuring a rugged titanium case, dual-frequency GPS, up to 36-hour battery life, and the brightest display ever.',
    specifications: ['49mm Titanium Case', 'Dual-frequency GPS', 'Up to 36 hours battery', 'Always-On Retina display']
  },
  {
    id: 'p5',
    name: 'Sony Alpha 7 IV Mirrorless Camera',
    category: 'cameras',
    price: 2498.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    description: 'A true hybrid powerhouse. With a 33MP Exmor R sensor, BIONZ XR processing engine, advanced Real-time Tracking AF, and 4K 60p video recording.',
    specifications: ['33MP Full-Frame Sensor', 'BIONZ XR image processor', 'Up to 10 fps shooting', '4K 60p video capability']
  },
  {
    id: 'p6',
    name: 'Keychron Q1 Pro Mechanical Keyboard',
    category: 'gaming',
    price: 199.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=600',
    description: 'Full metal QMK/VIA wireless mechanical keyboard. Machined aluminum body, double-gasket design, and hot-swappable switches for the ultimate typing experience.',
    specifications: ['Full CNC Aluminum Body', 'QMK/VIA Support', 'Hot-swappable Switches', 'Wireless Bluetooth & Wired USB'],
    isNew: true
  },
  {
    id: 'p7',
    name: 'Samsung Odyssey Neo G9 Gaming Monitor',
    category: 'laptops',
    price: 1799.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
    description: '49-inch curved gaming monitor. Quantum Mini-LED technology, 240Hz refresh rate, 1ms response time, and Dual QHD resolution for next-level gaming immersion.',
    specifications: ['49-inch 1000R Curved', 'Quantum Mini-LED', '240Hz Refresh / 1ms Response', '2,000 nits peak brightness'],
    isHot: true
  },
  {
    id: 'p8',
    name: 'Sonos Move 2 Portable Speaker',
    category: 'audio',
    price: 449.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600',
    description: 'Premium portable speaker. Stereo sound, up to 24 hours of battery life, durable water-resistant design, and built-in voice control with WiFi and Bluetooth.',
    specifications: ['Stereo Sound / Trueplay Tuning', '24-hour battery life', 'IP56 weather resistant', 'WiFi & Bluetooth connectivity']
  },
  {
    id: 'p9',
    name: 'Dell XPS 15 OLED Laptop',
    category: 'laptops',
    price: 1899.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600',
    description: 'Stunning 15.6-inch OLED display. Powered by 13th Gen Intel Core i7, NVIDIA GeForce RTX 4060, and housed in an ultra-premium machined aluminum chassis.',
    specifications: ['Intel Core i7-13700H', '32GB DDR5 RAM', '1TB NVMe SSD', '15.6" 3.5K OLED Touch'],
    isNew: true
  },
  {
    id: 'p10',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    category: 'laptops',
    price: 1599.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600',
    description: 'The legendary business ultrabook. Feather-light carbon fiber build, legendary keyboard, robust security features, and exceptional battery life.',
    specifications: ['Intel Core i7 vPro', '16GB LPDDR5 RAM', '512GB PCIe Gen 4 SSD', '14.0" WUXGA Anti-Glare']
  },
  {
    id: 'p11',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    price: 1299.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
    description: 'Welcome to the era of mobile AI. Armed with Galaxy AI, a titanium frame, 200MP camera system, built-in S Pen, and Snapdragon 8 Gen 3.',
    specifications: ['Snapdragon 8 Gen 3 for Galaxy', '200MP Main / 50MP Zoom', '12GB RAM / 256GB Storage', '6.8" Dynamic AMOLED 2X'],
    isHot: true
  },
  {
    id: 'p12',
    name: 'Google Pixel 8 Pro',
    category: 'smartphones',
    price: 999.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
    description: 'The all-pro phone engineered by Google. Features the advanced Google Tensor G3 chip, fully upgraded pro cameras, and futuristic Gemini-powered AI features.',
    specifications: ['Google Tensor G3 Chip', '50MP Triple Camera System', '12GB RAM / 128GB Storage', '6.7" Super Actua Display'],
    isNew: true
  },
  {
    id: 'p13',
    name: 'OnePlus 12 5G SmartPhone',
    category: 'smartphones',
    price: 799.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565849906660-703644f80286?auto=format&fit=crop&q=80&w=600',
    description: 'Smooth Beyond Belief. Powered by Snapdragon 8 Gen 3, Hasselblad 4th Gen Camera for Mobile, and support for lightning-fast 100W SUPERVOOC charging.',
    specifications: ['Snapdragon 8 Gen 3', '50MP Hasselblad Camera', '16GB RAM / 512GB Storage', '100W SUPERVOOC Charging']
  },
  {
    id: 'p14',
    name: 'Bose QuietComfort Ultra Headphones',
    category: 'audio',
    price: 429.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600',
    description: 'Immersive sound, world-class quiet. Breakthrough spatial audio for more immersive listening, and custom-tailored sound with CustomTune technology.',
    specifications: ['Bose Immersive Audio', 'World-Class Noise Cancellation', 'CustomTune Sound Calibration', 'Up to 24 Hours Battery Life']
  },
  {
    id: 'p15',
    name: 'Apple AirPods Pro (2nd Generation)',
    category: 'audio',
    price: 249.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1588449668338-d15176d447b9?auto=format&fit=crop&q=80&w=600',
    description: 'Rebuilt from the sound up. Powered by the Apple H2 chip, featuring up to 2x more Active Noise Cancellation, Adaptive Audio, and touch controls.',
    specifications: ['Apple H2 Headphone Chip', 'Adaptive Audio & Transparency', 'Personalized Spatial Audio', 'USB-C MagSafe Charging Case'],
    isNew: true
  },
  {
    id: 'p16',
    name: 'Samsung Galaxy Watch 6 Classic',
    category: 'wearables',
    price: 349.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600',
    description: 'The return of the rotating bezel. Premium stainless steel design, personalized heart rate zones, advanced sleep coaching, and BIA body composition scanner.',
    specifications: ['Physical Rotating Bezel', 'Stainless Steel Chassis', 'BioActive Sensor Suite', 'Wear OS Powered by Samsung']
  },
  {
    id: 'p17',
    name: 'Garmin Fenix 7 Pro Sapphire Solar',
    category: 'wearables',
    price: 699.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    description: 'Ultimate multisport GPS smartwatch. Power Sapphire solar charging lens, built-in LED flashlight, endurance score, and advanced training metrics.',
    specifications: ['Solar Charged Titanium Bezel', 'Scratch-Resistant Sapphire Lens', 'Up to 22 Days Battery Life', 'Multi-Band GPS Navigation'],
    isHot: true
  },
  {
    id: 'p18',
    name: 'Fujifilm X-T5 Mirrorless Camera',
    category: 'cameras',
    price: 1699.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=600',
    description: 'Photography first. Compact retro mirrorless camera with a 40.2MP X-Trans CMOS 5 HR sensor, 5-axis IBIS, and dedicated exposure dials.',
    specifications: ['40.2MP X-Trans CMOS 5 Sensor', '7.0 stop In-Body Stabilization', 'Retro Dial Interface Design', '4K/60p and 6.2K/30p Video']
  },
  {
    id: 'p19',
    name: 'GoPro Hero 12 Black Action Cam',
    category: 'cameras',
    price: 399.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?auto=format&fit=crop&q=80&w=600',
    description: 'The best HERO camera yet. High Dynamic Range (HDR) video, HyperSmooth 6.0 video stabilization, and longer runtimes with Enduro battery.',
    specifications: ['5.3K60 + 4K120 Video Resolution', 'HyperSmooth 6.0 Video Stabilization', 'Waterproof to 33ft (10m)', 'Dual LCD Displays'],
    isNew: true
  },
  {
    id: 'p20',
    name: 'Sony PlayStation 5 Slim Console',
    category: 'gaming',
    price: 499.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606813907291-d86edd9b94db?auto=format&fit=crop&q=80&w=600',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    specifications: ['Ultra-High Speed 1TB SSD', 'Ray Tracing Technology', '4K-TV Gaming Support', 'Tempest 3D AudioTech'],
    isHot: true
  },
  {
    id: 'p21',
    name: 'Nintendo Switch OLED Model',
    category: 'gaming',
    price: 349.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1595169065115-f12b685180f6?auto=format&fit=crop&q=80&w=600',
    description: 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen, wide adjustable stand, wired LAN port dock, and 64GB storage.',
    specifications: ['Vibrant 7-inch OLED Screen', 'Wide Adjustable Stand', 'Wired LAN Port in Dock', '64GB System Storage']
  },
  {
    id: 'p22',
    name: 'ASUS ROG Ally Gaming Handheld',
    category: 'gaming',
    price: 699.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    description: 'Play any game, anywhere. A true Windows 11 handheld gaming machine powered by AMD Ryzen Z1 Extreme processor and 120Hz display.',
    specifications: ['AMD Ryzen Z1 Extreme CPU', '16GB LPDDR5 Dual-Channel RAM', '512GB PCIe 4.0 NVMe SSD', '7" 120Hz Full HD Touchscreen'],
    isNew: true
  },
  {
    id: 'p23',
    name: 'Xbox Series X 1TB Console',
    category: 'gaming',
    price: 499.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=600',
    description: 'The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X.',
    specifications: ['True 4K Gaming / 120 FPS', '1TB Custom NVMe SSD', 'Xbox Velocity Architecture', 'Backward Compatibility Support'],
    isHot: true
  },
  {
    id: 'p24',
    name: 'Logitech G Pro X Superlight 2 Mouse',
    category: 'gaming',
    price: 159.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=600',
    description: 'The next evolution of our championship-winning gaming mouse. Re-engineered to achieve 60g weight with sub-micron accuracy sensor.',
    specifications: ['LIGHTSPEED Wireless Tech', 'HERO 2 Sensor / 32,000 DPI', '60g Ultra-Lightweight Design', 'USB-C Charging Interface'],
    isNew: true
  },
  {
    id: 'p25',
    name: 'Meta Quest 3 128GB VR Headset',
    category: 'gaming',
    price: 499.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=600',
    description: 'Breakthrough mixed reality headset that transforms your home into a virtual playground, blending virtual elements with your physical space.',
    specifications: ['Full-Color Mixed Reality Passthrough', 'Snapdragon XR2 Gen 2 Processor', '4K+ Infinite Display Resolution', '3D Spatial Audio System'],
    isHot: true
  },
  {
    id: 'p26',
    name: 'SteelSeries Arctis Nova Pro Wireless',
    category: 'gaming',
    price: 349.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600',
    description: 'Reach almighty audio levels with the Nova Pro Acoustic System. Active Noise Cancellation, dual wireless connection, and infinite swappable batteries.',
    specifications: ['Active Noise Cancellation (ANC)', 'Dual Wireless (2.4GHz + Bluetooth)', 'Infinity Power Swappable Battery', 'Hi-Res Audio Certified Drivers']
  }
];
