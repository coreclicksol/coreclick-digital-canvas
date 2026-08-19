import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";

export const images = { hero, about, p1, p2, p3, p4, p5, g1, g2, g3, g4, g5, g6 };

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blogs", to: "/blogs" },
  { label: "Packages", to: "/packages" },
  { label: "Contact", to: "/contact" },
] as const;

export const services = [
  {
    title: "Web Design",
    desc: "Beautiful and conversion-focused websites built around your brand story.",
    tag: "01",
  },
  {
    title: "UI/UX",
    desc: "Intuitive digital experiences designed around real user behaviour.",
    tag: "02",
  },
  {
    title: "Branding",
    desc: "Visual identities that make businesses recognisable and memorable.",
    tag: "03",
  },
  {
    title: "Web Development",
    desc: "Fast, responsive and scalable builds engineered for growth.",
    tag: "04",
  },
  {
    title: "Graphic Design",
    desc: "Creative visuals and campaign assets for modern brands.",
    tag: "05",
  },
];

export const projects = [
  {
    no: "01",
    title: "Maison Noir",
    category: "Hospitality",
    desc: "A premium restaurant website with cinematic imagery and a frictionless reservation flow.",
    tags: ["Web Design", "Development", "Art Direction"],
    image: p1,
  },
  {
    no: "02",
    title: "Vanta",
    category: "SaaS",
    desc: "A modern SaaS landing page engineered for clarity, speed and conversion.",
    tags: ["UI/UX", "Landing Page", "Motion"],
    image: p2,
  },
  {
    no: "03",
    title: "Aurelia",
    category: "E-Commerce",
    desc: "A luxury fashion commerce concept balancing editorial storytelling with product focus.",
    tags: ["Branding", "E-Commerce", "Design System"],
    image: p3,
  },
  {
    no: "04",
    title: "EstateOne",
    category: "Real Estate",
    desc: "A property discovery experience with map-led search and refined listing detail pages.",
    tags: ["Product Design", "Development"],
    image: p4,
  },
  {
    no: "05",
    title: "Nuvia",
    category: "Technology",
    desc: "A technology startup identity and website built to signal confidence from day one.",
    tags: ["Identity", "Web Design", "3D"],
    image: p5,
  },
];

export const galleryItems = [
  { id: 1, title: "Brand Identity System", cat: "Branding", image: g1 },
  { id: 2, title: "Mobile App Screens", cat: "UI/UX", image: g2 },
  { id: 3, title: "Typography Poster", cat: "Graphics", image: g3 },
  { id: 4, title: "Gradient Study", cat: "Experiments", image: g4 },
  { id: 5, title: "Portfolio Website", cat: "Web", image: g5 },
  { id: 6, title: "Social Campaign Kit", cat: "Graphics", image: g6 },
  { id: 7, title: "Restaurant Website", cat: "Web", image: p1 },
  { id: 8, title: "SaaS Dashboard", cat: "UI/UX", image: p2 },
  { id: 9, title: "Fashion Commerce", cat: "Web", image: p3 },
  { id: 10, title: "Object Studies", cat: "Experiments", image: p5 },
  { id: 11, title: "Architectural Interface", cat: "UI/UX", image: p4 },
  { id: 12, title: "Studio Process", cat: "Branding", image: about },
];

export const galleryFilters = ["All", "Web", "UI/UX", "Branding", "Graphics", "Experiments"];

export const posts = [
  {
    slug: "modern-website-2026",
    title: "Why Your Business Needs a Modern Website in 2026",
    category: "Strategy",
    date: "12 Aug 2026",
    read: "6 min read",
    excerpt:
      "Your website is no longer a brochure — it is the first handshake, the first impression and often the first sale.",
    image: p2,
    body: [
      "Buying behaviour has moved almost entirely online. Before a customer speaks to you, they have already judged your business by the quality of your digital presence.",
      "A modern website in 2026 means fast load times, clear positioning, accessible interactions and a design language consistent with your brand across every screen.",
      "The businesses that win are not the loudest — they are the clearest. Clarity is a design outcome, and it is achievable with the right structure and hierarchy.",
    ],
  },
  {
    slug: "design-mistakes",
    title: "5 Design Mistakes That Make Websites Look Cheap",
    category: "Design",
    date: "02 Aug 2026",
    read: "5 min read",
    excerpt:
      "Cheap is rarely about budget. It is about inconsistent spacing, weak typography and decoration without intent.",
    image: g3,
    body: [
      "Mistake one: too many typefaces. Two families, used with discipline, will always outperform five.",
      "Mistake two: inconsistent spacing. A spacing scale is the cheapest way to look expensive.",
      "Mistake three, four and five: stock imagery without direction, low contrast text, and animation applied everywhere instead of where it matters.",
    ],
  },
  {
    slug: "ui-builds-trust",
    title: "How Great UI Builds Customer Trust",
    category: "UI/UX",
    date: "24 Jul 2026",
    read: "7 min read",
    excerpt:
      "Trust is built in milliseconds. Interface quality is the fastest proxy customers have for the quality of your work.",
    image: g2,
    body: [
      "Users cannot audit your operations, so they judge your reliability by what they can see and touch.",
      "Predictable navigation, honest microcopy and responsive feedback all signal competence.",
      "Every interaction that behaves exactly as expected deposits a little more confidence.",
    ],
  },
  {
    slug: "website-vs-landing-page",
    title: "Website vs Landing Page — What Does Your Business Need?",
    category: "Strategy",
    date: "15 Jul 2026",
    read: "4 min read",
    excerpt:
      "One is a home. The other is a doorway built for a single decision. Choosing wrong wastes budget.",
    image: p5,
    body: [
      "A landing page exists to convert a specific audience with a specific offer. Everything else is a distraction.",
      "A full website exists to build credibility over time: services, work, proof, story and contact.",
      "Most growing businesses eventually need both, sequenced correctly.",
    ],
  },
  {
    slug: "branding-beyond-logo",
    title: "Why Branding Matters More Than a Logo",
    category: "Branding",
    date: "04 Jul 2026",
    read: "6 min read",
    excerpt:
      "A logo is a signature. A brand is everything the signature promises — tone, colour, motion and consistency.",
    image: g1,
    body: [
      "Brands are recognised through repetition of a system, not a single mark.",
      "Colour, type, photography direction and voice do more work than any icon ever will.",
      "Build the system first; the logo becomes the easy part.",
    ],
  },
];

export const packages = [
  {
    no: "01",
    name: "Launch",
    badge: "",
    price: "From $890",
    forWho: "For businesses starting their digital journey",
    features: [
      "Landing page",
      "Responsive design",
      "Basic UI/UX",
      "Contact form",
      "Social media integration",
      "Basic SEO setup",
      "Deployment",
    ],
    cta: "Start Your Project",
    featured: false,
  },
  {
    no: "02",
    name: "Elevate",
    badge: "Most Popular",
    price: "From $2,400",
    forWho: "For businesses ready to build a stronger digital presence",
    features: [
      "Multi-page website",
      "Custom UI/UX",
      "Responsive development",
      "Premium animations",
      "Contact / lead forms",
      "WhatsApp integration",
      "Basic SEO",
      "Analytics integration",
      "Deployment",
      "30 days support",
    ],
    cta: "Let's Discuss",
    featured: true,
  },
  {
    no: "03",
    name: "Signature",
    badge: "✦ Premium",
    price: "From $5,900",
    forWho: "For brands that want a complete premium digital experience",
    features: [
      "Custom brand direction",
      "Complete UI/UX",
      "Premium multi-page website",
      "Advanced interactions",
      "Custom animations",
      "CMS / blog",
      "Advanced forms",
      "SEO foundation",
      "Analytics",
      "Performance optimization",
      "Deployment",
      "90 days support",
    ],
    cta: "Build Something Exceptional",
    featured: false,
  },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "GitHub", href: "https://github.com" },
];
