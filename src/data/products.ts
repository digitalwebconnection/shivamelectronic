import type { Product } from '../types';

export const categories = [
  {
    name: 'Connectors & Sockets',
    slug: 'connectors',
    description: 'Aviation plugs, DB9 serial connectors, IC DIP sockets, and standard IEC power connections.',
    icon: 'Cpu',
    featured: ['GX16 Aviation Plug', 'DB9 Serial Connector', '14-Pin IC Socket']
  },
  {
    name: 'Cables & Power Cords',
    slug: 'cables',
    description: 'Computer power cords, AC figure-8 device power cables, and durable wire shielding.',
    icon: 'Cable',
    featured: ['Computer Power Cord', 'Figure-8 Power Cable', '2-Pin AC Cord']
  },
  {
    name: 'Switches & Relays',
    slug: 'switches',
    description: 'Illuminated rocker switches, KCD4 power switches, and panel-mount momentary push buttons.',
    icon: 'Power',
    featured: ['Illuminated Rocker Switch', 'KCD4 Rocker Switch', 'PBS-110 Push Button']
  },
  {
    name: 'Hardware & Accessories',
    slug: 'hardware',
    description: 'Conical rubber strain relief grommets, anti-vibration chassis feet, and rubber spacers.',
    icon: 'Settings',
    featured: ['Rubber Cable Grommet', 'Chassis Rubber Feet', 'Anti-vibration Spacers']
  },
  {
    name: 'Optoelectronics & LEDs',
    slug: 'optoelectronics',
    description: 'Indicator components, diffusing through-hole LEDs, and panel signal assemblies.',
    icon: 'Sun',
    featured: ['5mm Red LED', 'LED Component', 'diffusing red led']
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: '14-Pin IC Socket (DIP-14)',
    category: 'connectors',
    price: 0.25,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.44 AM.jpeg',
    description: 'Dual-in-line (DIP) 14-pin IC socket with a 2.54mm pitch. Features high-quality tin-plated alloy contacts, rigid thermoplastic body, and standard solder tail pins. Essential for IC prototyping and PCB boards.',
    specifications: ['14-Pin DIP Configuration', '2.54mm (0.1") pitch', 'Tin-plated copper alloy pins', 'Operating Temp: -55°C to +105°C'],
    isHot: true
  },
  {
    id: 'p2',
    name: 'Anjali Premium Computer Power Cord (1.5m)',
    category: 'cables',
    price: 4.99,
    rating: 4.9,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.45 AM.jpeg',
    description: 'Shivam Electronic World standard computer power cord (AE-101) manufactured by Anjali. Heavy-duty 1.5-meter cable featuring a standard 3-pin Indian/European plug on one end and IEC female C13 plug on the other. 100% OK tested copper core with robust outer insulation.',
    specifications: ['Length: 1.5 Meters', 'Model: AE-101', 'IEC C13 to 3-Pin Plug', '100% Copper Core / Certified ISO 9001'],
    isNew: true
  },
  {
    id: 'p3',
    name: 'KCD4 Heavy-Duty Rocker Switch (Black)',
    category: 'switches',
    price: 0.95,
    rating: 4.7,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.46 AM (1).jpeg',
    description: 'High-current dual-position (I/O) rocker switch (KCD4 model). Rated for 15A 250VAC / 20A 125VAC. Features a 4-pin double-pole single-throw (DPST) design, standard snap-in mount size, and copper contacts.',
    specifications: ['KCD4 Series', '4-Pin DPST I/O Switch', 'Rating: 15A 250V / 20A 125V AC', 'Snap-in Panel Mount'],
    isNew: true
  },
  {
    id: 'p4',
    name: 'Illuminated Red KCD4 Rocker Switch',
    category: 'switches',
    price: 1.25,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.46 AM.jpeg',
    description: 'Red neon-lit 4-pin double-pole single-throw (DPST) rocker switch. Features built-in indicator neon light that illuminates when switched ON. Rated for 15A 250V AC and 20A 125V AC. Ideal for water dispensers, power strips, and instrumentation.',
    specifications: ['Built-in Neon Light Indicator', '4-Pin DPST Configuration', 'Rating: 15A 250VAC / 20A 125VAC', 'Snap-in mount'],
    isHot: true
  },
  {
    id: 'p5',
    name: 'Conical Rubber Cable Strain Relief Grommet',
    category: 'hardware',
    price: 0.15,
    rating: 4.6,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.47 AM (1).jpeg',
    description: 'Conical double-sided black rubber grommet designed for cable protection and strain relief. Restricts wire bending and protects cables from chafing against sharp metal chassis holes. Inner diameter 8mm, outer slot diameter fits standard 12mm panel cutouts.',
    specifications: ['Synthetic Black Rubber', 'Conical Shape for Strain Relief', 'Fits 12mm Chassis Holes', 'Protects cables from metal edges']
  },
  {
    id: 'p6',
    name: 'Figure-8 AC Power Cord (Right-Angle C7)',
    category: 'cables',
    price: 3.49,
    rating: 4.7,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.47 AM.jpeg',
    description: '2-pin AC power cord featuring a right-angle 2-slot figure-8 IEC 60320 C7 connector and Europlug Type C (CEBEC certified). Designed with high-durability H03VVH2-F cable, perfect for space-constrained outlets behind TVs, consoles, and chargers.',
    specifications: ['IEC 60320 C7 Connector', 'Right-Angle Space Saving', 'Cable Type: H03VVH2-F', 'Europlug Type C CEBEC certified'],
    isNew: true
  },
  {
    id: 'p7',
    name: '5mm Diffusing Red LED Component (Pack of 50)',
    category: 'optoelectronics',
    price: 2.99,
    rating: 4.9,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.48 AM (1).jpeg',
    description: 'Pack of 50 standard 5mm through-hole diffusing red Light Emitting Diodes (LEDs). Perfect for indicator lights, DIY electrical projects, and breadboard testing. Features low power consumption, high brightness, and long lead terminals.',
    specifications: ['Quantity: 50 Pieces', 'Size: 5mm (T1-3/4)', 'Forward Voltage: 1.8V - 2.2V', 'Lens: Red Diffused / 20mA current'],
    isHot: true
  },
  {
    id: 'p8',
    name: 'Momentary Red Push Button Switch (PBS-110)',
    category: 'switches',
    price: 0.60,
    rating: 4.7,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.48 AM.jpeg',
    description: 'PBS-110 panel-mount momentary push button switch. Features a red button top, normally open (NO) action, and 2 solder terminal pins. Small footprint makes it ideal for doorbells, custom project controllers, and dashboard panels.',
    specifications: ['Model: PBS-110', 'Momentary Action (Self-Reset)', 'Normally Open (NO)', 'Mounting Hole: 7mm / Rating: 1A 250VAC'],
    isNew: true
  },
  {
    id: 'p9',
    name: 'IEC 320 C13 & C14 Power Connector Set',
    category: 'connectors',
    price: 1.99,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.49 AM (1).jpeg',
    description: 'A complete power connector pairing including one Rewireable IEC 320 C13 female plug connector (screw terminals, straight cable entry) and one Panel-Mount IEC 320 C14 male socket inlet. Rated for 10A 250V. Ideal for power distribution units and DIY computer cases.',
    specifications: ['IEC 320 C13 Female Plug', 'IEC 320 C14 Male Socket', 'Rating: 10A 250V AC', 'Heavy-Duty Thermoplastic Body']
  },
  {
    id: 'p10',
    name: 'DB9 Male & Female Solder Connector Pair',
    category: 'connectors',
    price: 1.49,
    rating: 4.7,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.49 AM.jpeg',
    description: 'D-Sub 9-pin serial interface connector pair containing one DB9 Male connector (gold-plated pins) and one DB9 Female connector (solder cups). Features a blue insulator block and solid metal shell. Used for serial RS232 communications and custom micro-controller cables.',
    specifications: ['9-Pin D-Sub Configuration', 'Includes 1 Male + 1 Female', 'Solder Cup Terminations', 'RS232 / Serial DB9 standard'],
    isNew: true
  },
  {
    id: 'p11',
    name: 'Cylindrical Black Rubber Chassis Feet (Pack of 10)',
    category: 'hardware',
    price: 1.99,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.50 AM (1).jpeg',
    description: 'Pack of 10 cylindrical black rubber feet and chassis spacers. Provides excellent anti-vibration damping, non-slip grip, and height clearance for electronic enclosures, speaker boxes, and power supplies. Features a center screw hole for easy M3 or M4 screw mounting.',
    specifications: ['Quantity: 10 Spacers', 'Anti-Vibration Rubber Material', 'Center screw mounting hole', 'Non-slip cylindrical design']
  },
  {
    id: 'p12',
    name: 'GX16 4-Pin Metal Aviation Plug Connector',
    category: 'connectors',
    price: 2.49,
    rating: 4.9,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.50 AM.jpeg',
    description: 'Heavy-duty GX16 4-pin male/female thread-locking metal aviation connector set. Includes one panel-mount male socket and one cable-end female plug. Designed for industrial control panels, automation, data acquisition, and audio systems. Provides waterproof IP55 rating and excellent signal conductivity.',
    specifications: ['GX16 Series Aviation Joint', '4-Pin Male & Female Set', 'Thread-locking design / IP55', 'Rating: 5A 125V / Contact Resistance < 0.005 ohm'],
    isHot: true
  },
  {
    id: 'p13',
    name: 'RJ45 Cat6 Shielded Modular Plug (Pack of 25)',
    category: 'connectors',
    price: 12.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
    description: 'Premium shielded RJ45 Cat6 connectors featuring 50-micron gold-plated contacts and metal shielding for electromagnetic interference reduction. Fits standard 23AWG-24AWG solid or stranded ethernet wires.',
    specifications: ['RJ45 Shielded Cat6 standard', '50-micron gold plated pins', 'Metal shielding layer', 'Compatible with 23-24AWG cables']
  },
  {
    id: 'p14',
    name: 'Flat Ribbon Cable 10-Wire (5 Meters)',
    category: 'cables',
    price: 5.49,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
    description: 'Flexible rainbow flat ribbon cable with 10 conductors. Designed for easy routing inside custom micro-controller cabinets, single-board computer setups, and test jigs. Standard 1.27mm wire pitch.',
    specifications: ['10-wire flat ribbon cable', 'Length: 5 Meters', 'Pitch: 1.27mm (0.05")', 'Conductor gauge: 28 AWG']
  },
  {
    id: 'p15',
    name: 'Illuminated Green KCD1 Rocker Switch (3-Pin)',
    category: 'switches',
    price: 0.85,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.46 AM.jpeg',
    description: 'Panel snap-in 3-pin single-pole single-throw (SPST) KCD1 rocker switch. Features an integrated green neon bulb indicator that glows under 220V operation. Rated for 6A 250VAC / 10A 125VAC.',
    specifications: ['KCD1 Series Switch', '3-Pin SPST design', 'Integrated green neon bulb', 'Rating: 6A 250V / 10A 125VAC'],
    isNew: true
  },
  {
    id: 'p16',
    name: 'Hex Brass Standoff kit M3 (Pack of 50)',
    category: 'hardware',
    price: 8.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600',
    description: 'Solid brass hexagonal pillar standoffs with M3 threaded male-to-female and female-to-female joints. Essential spacers for mounting PCB boards, modules, and displays inside metal control panels.',
    specifications: ['Thread size: M3 standard', 'Solid brass construction', 'Pack contains 25 male-female + 25 female-female', 'Length variety: 5mm to 20mm'],
    isHot: true
  },
  {
    id: 'p17',
    name: '5mm Diffusing Green LED (Pack of 50)',
    category: 'optoelectronics',
    price: 2.99,
    rating: 4.8,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.48 AM (1).jpeg',
    description: 'Pack of 50 standard 5mm through-hole diffusing green Light Emitting Diodes (LEDs). Features vibrant green illumination, low thermal resistance, and long metal pin terminals. Excellent for signal control panels.',
    specifications: ['Quantity: 50 Pieces', 'Size: 5mm (T1-3/4)', 'Forward Voltage: 2.0V - 2.4V', 'Lens: Green Diffused / 20mA']
  },
  {
    id: 'p18',
    name: 'BNC Male Crimp Connectors RG59 (Pack of 10)',
    category: 'connectors',
    price: 6.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
    description: 'High frequency 75 Ohm BNC male compression crimp connector plugs. Fits RG59 coaxial cables for high-resolution CCTV camera signals and lab instrumentation. Features a brass body with nickel plating.',
    specifications: ['BNC Male Plug', 'Impedance: 75 Ohm', 'Suitable Cable: RG59 Coaxial', 'Nickel-plated brass body'],
    isNew: true
  },
  {
    id: 'p19',
    name: 'Shivam Dual-Core Shielded Cable (10m Roll)',
    category: 'cables',
    price: 11.99,
    rating: 4.9,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.45 AM.jpeg',
    description: 'Shivam Electronic World specialized shielded dual-conductor cable designed for audio and sensitive signal transmissions. Wrapped in flexible PVC insulation jacket with copper mesh shielding to eliminate crosstalk.',
    specifications: ['Conductors: 2 Core Shielded', 'Length: 10 Meter roll', 'Insulation: Heavy Duty PVC', 'Shielding: Copper Braided Mesh'],
    isHot: true
  },
  {
    id: 'p20',
    name: 'Rotary Switch 2-Pole 6-Position (RS26)',
    category: 'switches',
    price: 2.25,
    rating: 4.7,
    image: '/assets/product/WhatsApp Image 2026-07-04 at 10.56.48 AM.jpeg',
    description: 'Industrial grade 2-pole 6-position rotary band selector switch with a 6mm shaft. Features durable silver-plated contacts, robust phenolic resin body, and positive click-stop feedback. Perfect for audio mixers and power controls.',
    specifications: ['Model: RS26 Band Switch', '2-Pole 6-Position', 'Rating: 0.3A 125VAC', 'Shaft Diameter: 6mm']
  }
];
