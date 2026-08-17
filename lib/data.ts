// Single source of truth for all site content — real business facts plus the
// Hinglish, budget-conscious copy the client chose to keep from the "V2" pass.

export const contact = {
  phones: ["+91 70001 65318"],
  emails: ["contact@decorcityvision.in", "decorcityvisionbhilai@gmail.com"],
  address:
    "Decorcity Vision, Avantibai Chowk, near Ashirwad Tiles Shop, Kripal Nagar, Bhilai, Chhattisgarh 490023",
  // Verified against the business's real Google Maps listing.
  latitude: 21.22105458114469,
  longitude: 81.34120327604424,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.2721371777507!2d81.34120327604424!3d21.22105458114469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2923581bb5c5bf%3A0xeb24036d5d0dd159!2sDecorcity%20Vision!5e0!3m2!1sen!2sin!4v1785657210286!5m2!1sen!2sin",
  whatsapp: "https://wa.link/io570m",
  hours: {
    open: "09:00 AM",
    close: "08:30 PM",
    days: "Roz Khula",
  },
  // Studio visiting hours are fixed above — phone/WhatsApp consultation is not.
  callAvailability: "24x7 Phone & WhatsApp Consultation",
  // Left blank on purpose — no real handles yet. SocialLinks.tsx only renders
  // an icon once its URL is actually set (here or in Sanity's siteSettings),
  // so this never produces a broken or wrong link.
  socialLinks: {
    instagram: "",
    facebook: "",
  },
  // Falls back to the general contact email until a dedicated one is set.
  careersEmail: "contact@decorcityvision.in",
};

export const developerCreditPrefix = "Developed and managed by";
export const developerCreditName = "Googlixlabs";
export const developerCreditUrl = "https://googlixlabs.com";

// Fallback hero content — used until a "hero" document is created in Sanity
// Studio. Media type defaults to "image" (not "video") on purpose: this is
// the same self-hosted photo used as the background, which is what keeps the
// homepage's Lighthouse performance where it is today. Once a real, properly
//-sized video is uploaded via Studio and mediaType is switched to "video"
// there, the site picks it up automatically — see components/ScrollExpandHero.tsx.
export const heroContent = {
  backgroundImage: "/hero/hero-bedroom.jpg",
  mediaType: "image" as "video" | "image",
  media: null as string | null,
  mediaPoster: null as string | null,
  mediaImage: "/hero/hero-bedroom.jpg",
  eyebrow: "Decorcity Vision · Bhilai, Durg & Rajnandgaon",
  titleLead: "Ghar Ho To",
  titleAccent: "Aisa.",
  scrollHint: "Scroll Karke Kaam Dekhein",
  badgeText: "Ab Kerala Mein Bhi Available",
  subtitle:
    "Bhilai, Durg aur Rajnandgaon mein 500+ ghar aur office — khud aankhon se dekhiye.",
  galleryCtaLabel: "Hamara Kaam Dekhein",
  whatsappCtaLabel: "WhatsApp Karein",
};

// Cities actively served beyond the Bhilai studio — surfaced in hero/about/footer
// copy and in the LocalBusiness structured data's areaServed list.
export const serviceAreas = ["Bhilai", "Durg", "Rajnandgaon"];

export const siteUrl = "https://decorcityvision.in";

// Business-category keywords (from the client's Google Business Profile
// categories) plus natural city/service-modifier expansions — used in page
// metadata and LocalBusiness JSON-LD. Meta keywords carry little direct
// ranking weight today; the real SEO work is the per-page titles/descriptions,
// structured data, and on-page city mentions this list feeds into.
export const seoKeywords = [
  "Decorcity Vision",
  "Interior designer",
  "Interior designer Bhilai",
  "Interior designer Durg",
  "Interior designer Rajnandgaon",
  "Interior designer Chhattisgarh",
  "Interior Decorator",
  "Furniture Manufacturer",
  "Custom furniture Bhilai",
  "Home improvement store",
  "Modular home builder",
  "Modular home dealer",
  "Modular kitchen dealer Bhilai",
  "Modular kitchen designer Durg",
  "Painting studio",
  "Painting contractor Bhilai",
  "House painting Durg Rajnandgaon",
  "Vastu consultant",
  "Vastu consultant Bhilai",
  "Home health care service",
  "False ceiling contractor Bhilai",
  "POP and gypsum ceiling work",
  "Civil work contractor Chhattisgarh",
  "Renovation contractor Bhilai Durg",
  "Office interior designer Bhilai",
  "3D interior design Bhilai",
  "Best interior designer near me",
  "Affordable interior design Chhattisgarh",
  "Wardrobe and wall paneling work",
  "Railing and window work Bhilai",
  "Interior designer Kerala",
  "Ashirwad Tiles Shop Bhilai",
  "Avantibai Chowk Kripal Nagar Bhilai",
  "Decorcity Vision Bhilai Chhattisgarh 490023",

  // Durg — city-specific coverage
  "Interior decorator Durg",
  "Furniture manufacturer Durg",
  "Modular kitchen dealer Durg",
  "False ceiling contractor Durg",
  "POP ceiling work Durg",
  "Civil work contractor Durg",
  "Painting contractor Durg",
  "Vastu consultant Durg",
  "Home renovation contractor Durg",
  "Modular home builder Durg",
  "Wardrobe and wall paneling work Durg",
  "Railing and window installation Durg",
  "Best interior designer in Durg",
  "Office interior designer Durg",

  // Rajnandgaon — city-specific coverage
  "Interior decorator Rajnandgaon",
  "Furniture manufacturer Rajnandgaon",
  "Modular kitchen dealer Rajnandgaon",
  "False ceiling contractor Rajnandgaon",
  "Civil work contractor Rajnandgaon",
  "Painting contractor Rajnandgaon",
  "Vastu consultant Rajnandgaon",
  "Home renovation contractor Rajnandgaon",
  "Modular home dealer Rajnandgaon",
  "Best interior designer in Rajnandgaon",
  "Office interior designer Rajnandgaon",

  // Full service catalog — False Ceiling
  "POP false ceiling design",
  "Gypsum ceiling contractor",
  "Beat work ceiling design",
  "Mirror work ceiling",
  "Wooden texture ceiling",
  "Stretch ceiling installation",
  "PVC ceiling work",
  "Armstrong ceiling contractor",
  "Fluted panel and louvers ceiling",
  "Gypsum partition work",

  // Furniture Work
  "Modular kitchen cabinets",
  "TV unit design",
  "Designer sofa manufacturer",
  "Dining table and center table design",
  "Bed with side table design",
  "Wardrobe work custom design",
  "Crockery unit design",
  "Study unit and book shelf design",
  "Mandir unit design",
  "Wall paneling contractor",
  "Door lamination and lock fitting",
  "Washroom vanity design",
  "Glass partition work",

  // Renovation & Civil Work
  "Bathroom renovation contractor",
  "Complete house renovation Bhilai",
  "Home gardening design",
  "Granite and tile work contractor",
  "Plumbing and sanitary contractor",
  "Electrical wiring contractor",
  "AC pipeline installation",
  "Porch work contractor",
  "Termite pest control service",

  // Paint Work
  "Putty and paint contractor",
  "Waterproofing contractor Bhilai",
  "Wall texture work",
  "Dam blocking service",

  // Windows & Railing
  "Aluminum window installation",
  "UPVC window dealer",
  "System profile window",
  "Steel railing contractor",
  "Toughened glass railing",
  "Wooden railing design",
  "MS railing fabrication",

  // Decorative Items
  "Curtains and blinds fitting",
  "Chandelier and hanging lights",
  "Wall painting and wallpaper design",
  "PU stone and poly granite sheet",

  // servicesV2 homepage teaser
  "Free interior design consultation",
  "Electrical and lighting design",
];

export const testimonials: { name: string; quote: string }[] = [
  {
    name: "Avinash Kumar Chouhan",
    quote:
      "Best interior designer in Bhilai. Excellent services provided and quality work done by them. Highly recommended.",
  },
  {
    name: "Khushboo Bali",
    quote:
      "Mr Harish was always very communicative, responsive, creative and kind. We made a retirement home for our parents totally customised to our requirements.",
  },
  {
    name: "Zikra Farhin",
    quote:
      "A truly exceptional designer can listen to and carry out a client's vision and not simply stamp a cookie-cutter brand on your home. That's Decorcity Vision.",
  },
  {
    name: "Rajendra Nath Tiwari",
    quote:
      "In a short time my home design had been done in the best manner. The whole team is very cooperative and took care of my needs perfectly.",
  },
  {
    name: "Rishabh Gajbhiye",
    quote:
      "Wonderful experience with the team. Must recommend if you want quality work and job satisfaction as per your requirement.",
  },
  {
    name: "Tabassum Sheikh",
    quote:
      "Extremely talented and always a pleasure to work with. We've purchased furniture designed by them that not only looks great, it's comfortable too.",
  },
];

// Reviewer-praised differentiators the brief calls out that weren't surfaced
// anywhere in the site before — one line salvaged from the studio's own
// "Building Planning" service description, the rest new.
export const differentiators = [
  {
    icon: "cuboid",
    title: "3D Mein Dekhiye, Pehle Hi",
    description:
      "Kaam shuru hone se pehle, poora design 3D mein dekhein — site, floor aur elevation, sab kuch precise planning ke saath.",
  },
  {
    icon: "ruler",
    title: "Har Inch Ka Sahi Upyog",
    description:
      "Aapke room ki exact dimensions ke hisaab se space planning — kuch bhi waste nahi, sab kuch intentional.",
  },
  {
    icon: "eye",
    title: "Har Stage Par Transparency",
    description:
      "Design se lekar handover tak, har stage ki jaankari aapke saath share hoti hai — koi surprise nahi, sirf clarity.",
  },
  {
    icon: "users",
    title: "Cooperative Aur Dedicated Team",
    description:
      "Hamari team khud site pe involved rehti hai — cooperative staff, custom design, aur aapke ghar jaisa hi apnapan.",
  },
];

export type GalleryItem = {
  title: string;
  category: string;
  image: string;
};

export const heroSlides = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1800&auto=format&fit=crop",
];

export const gallery: GalleryItem[] = [
  {
    title: "Modular Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Living Room",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Master Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Office Interior",
    category: "Office",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Facade & Elevation",
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Dining Space",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kids Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kitchen Island",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Reception Desk",
    category: "Office",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
  },
];

export const categories = [
  "All",
  "Kitchen",
  "Living Room",
  "Bedroom",
  "Office",
  "Exterior",
];

export const trustPoints = [
  { icon: "home", label: "500+ Homes Done" },
  { icon: "star", label: "100% Happy Clients" },
  { icon: "history", label: "15+ Years — Bhilai, Durg, Rajnandgaon" },
  { icon: "shield-check", label: "10-Year Warranty" },
  { icon: "award", label: "ISO Certified" },
  { icon: "rupee", label: "Fits Your Budget" },
  { icon: "phone-call", label: "24x7 Phone Consultation" },
  { icon: "palmtree", label: "Now Serving Kerala" },
];

export const servicesV2 = [
  {
    icon: "sofa",
    title: "Interior Design",
    titleHi: "इंटीरियर डिज़ाइन",
    description: "Ghar ya office ka poora interior — sofa se lekar ceiling tak, ek hi jagah.",
    swatch: "clay",
  },
  {
    icon: "chef-hat",
    title: "Modular Kitchen",
    titleHi: "मॉड्यूलर किचन",
    description: "Jagah ke hisaab se design ki gayi kitchen — sundar bhi, kaam ki bhi.",
    swatch: "gold",
  },
  {
    icon: "wrench",
    title: "Plumbing Work",
    titleHi: "प्लंबिंग का काम",
    description: "Pipeline, tap aur bathroom fitting — sab plumbing kaam ek jagah.",
    swatch: "moss",
  },
  {
    icon: "lightbulb",
    title: "Electrical & Lighting",
    titleHi: "इलेक्ट्रिकल और लाइटिंग",
    description: "Ghar ki lighting design aur wiring — dono ka poora dhyaan.",
    swatch: "gold",
  },
  {
    icon: "paint-bucket",
    title: "Painting & Renovation",
    titleHi: "पेंटिंग और नवीनीकरण",
    description: "Purane ghar ko naya look — painting aur renovation ke saath.",
    swatch: "clay",
  },
  {
    icon: "message-circle-question",
    title: "Free Consultation",
    titleHi: "मुफ़्त परामर्श",
    description: "Ghar aake dekhenge, sahi salaah denge — bilkul free mein.",
    swatch: "moss",
  },
] as const;

// Full trade-by-trade service catalog (from the client's service list) — shown
// on /services. servicesV2 above stays as the concise homepage teaser.
export const serviceCatalog = [
  {
    category: "False Ceiling",
    swatch: "clay",
    items: [
      "POP Ceiling",
      "Gypsum Ceiling",
      "Beat Work Ceiling",
      "Mirror Work Ceiling",
      "Wooden Texture Ceiling",
      "Stretch Ceiling",
      "PVC Ceiling",
      "Armstrong Ceiling",
      "Fluted Panel & Louvers Ceiling",
      "POP Niche Work",
      "Panning Wall",
      "Gypsum Partition",
    ],
  },
  {
    category: "Furniture Work",
    swatch: "gold",
    items: [
      "Modular Kitchen (All Kinds of Cabinets)",
      "T.V. Unit",
      "Designer Sofas",
      "Center Table",
      "Dining Table",
      "Bed with Side Table",
      "Wardrobe Work (Any Kind)",
      "Crockery Unit",
      "Study Unit & Book Shelf",
      "Console Unit",
      "Mandir Unit",
      "Wall Paneling",
      "Door Laminations & Lock Fitting with Customization",
      "Washroom Vanities",
      "Wall Decorative Cabinets",
      "Wall Louvers Design",
      "Mirror Paneling",
      "Glass Partition & Gypsum Partition",
    ],
  },
  {
    category: "Renovation Work",
    swatch: "moss",
    items: [
      "Bathroom Renovation",
      "Complete Inside House Renovation (Including Wall Changes)",
      "Gardening Creation",
    ],
  },
  {
    category: "Civil Work",
    swatch: "clay",
    items: [
      "Granite & Tile Work",
      "Plumbing Work (Internal & Sanitary)",
      "Electrical Work (Internal & Outside)",
      "AC Pipeline Work",
      "Porch Work",
      "Pest Controlling for Termites",
    ],
  },
  {
    category: "Paint Work",
    swatch: "gold",
    items: ["Putty", "Paint", "Dam Blocking", "Water Proofing", "Texture Work"],
  },
  {
    category: "Windows",
    swatch: "moss",
    items: ["Aluminum Window", "UPVC Window", "System Profile Window"],
  },
  {
    category: "Railing",
    swatch: "clay",
    items: ["Steel Railing", "Toughened Glass Railing", "Wooden Railing", "M.S. Railing"],
  },
  {
    category: "Decorative Items",
    swatch: "gold",
    items: [
      "Curtains & Blinds with Fittings",
      "Chandeliers",
      "Hanging Lights",
      "Wall Paintings",
      "Wallpaper (Customized)",
      "UV Sheet",
      "Poly Granite Sheet",
      "PU Stone",
    ],
  },
] as const;

export const budgetConfig = {
  min: 10000,
  max: 2500000,
  step: 10000,
  default: 500000,
};

export function formatBudget(value: number) {
  const label =
    value >= 100000
      ? `₹${(value / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`
      : `₹${value.toLocaleString("en-IN")}`;
  return value >= budgetConfig.max ? `${label}+` : label;
}

export type ProjectV2 = {
  // Optional — some projects won't have a title, location or service tags
  // filled in via Sanity; components/ProjectsV2.tsx handles all being absent.
  title?: string;
  location?: string;
  tags?: string[];
  images: string[];
};

export const projectsV2: ProjectV2[] = [
  {
    title: "3BHK Full Home Makeover",
    location: "Nehru Nagar, Bhilai",
    tags: ["Interior Design", "Modular Kitchen", "Lighting", "Painting"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Modern Modular Kitchen",
    location: "Supela, Bhilai",
    tags: ["Modular Kitchen", "Plumbing", "Electrical & Lighting"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Backwater-View Villa Interior",
    location: "Kochi, Kerala",
    tags: ["Interior Design", "Modular Kitchen", "Furniture"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Office Interior Fit-out",
    location: "Avantibai Chowk, Bhilai",
    tags: ["Interior Design", "Electrical & Lighting", "Furniture"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Retirement Home Renovation",
    location: "Bhilai, Chhattisgarh",
    tags: ["Renovation", "Plumbing", "Painting", "Interior Design"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    title: "Coastal Home Renovation",
    location: "Thiruvananthapuram, Kerala",
    tags: ["Renovation", "Painting", "Electrical & Lighting"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export const FEATURED_PROJECTS_COUNT = 3;

export const youtubeChannelUrl = "https://www.youtube.com/@decorcityvision";

export type YoutubeVideo = {
  title: string;
  thumbnail: string;
  url: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  { id: "kk", name: "K.K. Kushwaha", role: "Founder & CEO", photo: "/team/kk-kushwaha.webp" },
  { id: "afsana", name: "Afsana", role: "Chief Designer", photo: "/team/afsana.webp" },
  { id: "diksha", name: "Diksha Kankariya", role: "3D Designer", photo: "/team/diksha-kankariya.webp" },
  { id: "harpreet", name: "Harpreet Kaur", role: "Designer & Site Executive", photo: "/team/harpreet-kaur.webp" },
  { id: "rashi", name: "Rashi Chopda", role: "Designer & Site Executive", photo: "/team/rashi-chopda.webp" },
  { id: "shubhangi", name: "Shubhangi Aglawe", role: "Site Executive", photo: "/team/shubhangi-aglawe.webp" },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Kya consultation sach mein free hai?",
    a: "Haan, bilkul. Hum aapke site pe aake dekhte hain aur sahi salaah dete hain — koi charge nahi, koi obligation nahi.",
  },
  {
    q: "Interior design ke kaam mein kitna time lagta hai?",
    a: "Ye project ke size par depend karta hai — ek modular kitchen kuch hafton mein ho jaati hai, poore ghar ke interior mein 6–10 hafte lag sakte hain. Exact timeline free consultation mein confirm karte hain.",
  },
  {
    q: "Kya kaam shuru hone se pehle 3D design dikhaya jaata hai?",
    a: "Haan — kaam shuru hone se pehle aapko poora design 3D mein dikhaya jaata hai, taaki final result mein koi surprise na ho.",
  },
  {
    q: "Kya aap Bhilai ke bahar bhi kaam karte hain?",
    a: "Abhi hum Bhilai, Chhattisgarh mein based hain aur Kerala mein bhi projects kar chuke hain. Kerala mein hamara poora studio jald hi shuru ho raha hai.",
  },
  {
    q: "Interior design ke alawa aur konsi services milti hain?",
    a: "False ceiling, plumbing, electrical, painting, civil work aur decor — sab kuch ek hi team se milta hai. Poori list humari Services page par dekh sakte hain.",
  },
  {
    q: "Budget kam ho to bhi kaam ho sakta hai?",
    a: "Bilkul. Hum har budget ke hisaab se kaam karte hain — ek room ke chhote kaam se lekar poore ghar ke renovation tak.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Hum aapke site pe aake aapki zaroorat aur budget samajhte hain — bilkul free.",
  },
  {
    number: "02",
    title: "3D Design",
    description: "Kaam shuru hone se pehle poora design 3D mein dekhein — koi guesswork nahi.",
  },
  {
    number: "03",
    title: "Execution",
    description: "Hamari team poora kaam sambhalti hai — design se lekar material tak, sab ek jagah.",
  },
  {
    number: "04",
    title: "Handover",
    description: "Apne naye space mein shift karein — time par, jaisa promise kiya gaya tha.",
  },
];

export const youtubeVideos: YoutubeVideo[] = [
  {
    title: "3BHK Home Tour — Nehru Nagar, Bhilai",
    thumbnail:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    url: youtubeChannelUrl,
  },
  {
    title: "Modular Kitchen Site Visit",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    url: youtubeChannelUrl,
  },
  {
    title: "Kochi Villa — Before & After",
    thumbnail:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    url: youtubeChannelUrl,
  },
];

export type JobOpening = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

// Placeholder openings — replace or remove via Sanity's `jobOpening`
// documents once real roles are finalized. components/CareerListings.tsx
// falls back to these only when Studio has no `jobOpening` documents yet.
export const jobOpenings: JobOpening[] = [

];
