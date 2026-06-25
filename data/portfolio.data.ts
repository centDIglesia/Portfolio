// ─── HERO ────────────────────────────────────────────────────────────────────

export const HERO = {
  name: "Vincent Donaire Iglesia",
  tagline: "PH-based 4th year BSIT student • PUP Santa Maria, Bulacan",
  roles: ["Frontend Engineer", "Node.js Developer"],
  description:
    "building modern web apps with React/Next.js, Tailwind, and MongoDB.",
  badges: ["React.js", "Next.js", "TypeScript", "Node.js", "PHP"],
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  bio: "I'm a web developer and layout artist who enjoys the mix of logic and creativity. I'm currently a BSIT student focused on building responsive sites. When I'm not programming, I'm usually designing—I love using my eye for detail to create strong visual structures.",
  tags: [
    "22 yrs old.",
    "Santa Maria, Bulacan",
    "BSIT • PUP Santa Maria",
    "4th year",
  ],
};

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

export type Experience = {
  role: string;
  company: string;
  hours: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    role: "UI/UX Designer Intern",
    company: "NexBridge Technologies Inc.",
    hours: "500 hrs",
    period: "March 2026 – June 2026",
    bullets: [
      "Designed, revamped and improved UI screens for a government contractor project in Figma, ensuring 100% accessibility compliance.",
      "Updated older project designs and built the interface for a motor loan app, making the application look modern and easy to use.",
      "Collaborated with senior developers across a hybrid Figma-to-Odoo (OWL framework) workflow, gaining exposure to enterprise application architecture.",
    ],
  },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export type TechLogo = {
  name: string;
  slug: string;
};

export const TECH_LOGOS: TechLogo[] = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Prisma", slug: "prisma" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "PHP", slug: "php" },
  { name: "Laravel", slug: "laravel" },
];

export const TECH_LOGOS2: TechLogo[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Laravel", slug: "laravel" },
  { name: "React", slug: "react" },
  { name: "JavaScript", slug: "javascript" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css" },
  { name: "PHP", slug: "php" },
  { name: "GitHub", slug: "github" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Prisma", slug: "prisma" },
  { name: "Git", slug: "git" },
];

export const TECH_LOGOS3: TechLogo[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "CSS3", slug: "css" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Prisma", slug: "prisma" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "JavaScript", slug: "javascript" },
  { name: "PHP", slug: "php" },
  { name: "Laravel", slug: "laravel" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "HTML5", slug: "html5" },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECT_CATEGORIES = ["All", "Website", "UI/UX", "Mobile App"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  features: string[];
  images: string[];
  link: string;
  isAlignRight?: boolean;
  stack?: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "DishCover AR",
    category: "Website",
    description:
      "An augmented reality web app that lets users preview dishes in AR before ordering. Features AI-powered 3D model generation, branded restaurant sites, and a complete order management system.",
    features: [
      "AR preview",
      "Mobile-first UI",
      "Fast load + optimized images",
      "AI 3D model generation",
      "Kiosk ordering system",
      "Branded restaurant sites",
      "Menu dashboard",
      "Cashier panel",
    ],
    images: [
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826850/Screenshot_2026-02-12_002034_bzvuek.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770825689/Screenshot_2026-02-12_000058_godznd.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770825736/Screenshot_2026-02-12_000204_agl5hh.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770825771/Screenshot_2026-02-12_000226_geymuk.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826091/Screenshot_2026-02-12_000757_phvsnj.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826301/Screenshot_2026-02-12_001131_r3bq3o.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826327/Screenshot_2026-02-12_001154_puvk4i.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826394/Screenshot_2026-02-12_001303_eokqcc.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826474/Screenshot_2026-02-12_001421_aciddh.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826549/Screenshot_2026-02-12_001536_yzn1sw.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826619/Screenshot_2026-02-12_001646_pksbyh.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826705/Screenshot_2026-02-12_001813_w5rprs.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826744/Screenshot_2026-02-12_001851_sos07n.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770826781/Screenshot_2026-02-12_001926_hxzfqh.png",
    ],
    link: "https://dishcoverar.online",
    isAlignRight: true,
    stack: [
      "Next.js",
      "Tailwind",
      "Better-auth",
      "JWT",
      "Mongodb",
      "Prisma",
      "Capstone 1 Project",
      "React",
      "shadcn",
      "zod",
    ],
  },
  {
    title: "YSMAEL",
    category: "Website",
    description:
      "A full-featured restaurant management platform with instant booking, online ordering, and virtual tours.",
    features: [
      "Instant Booking",
      "Online Ordering",
      "Virtual Tours",
      "Multi-function Rooms",
      "24/7 Support",
      "Mobile-first UI",
      "Fast load + optimized images",
    ],
    images: [
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827623/Screenshot_2026-02-12_003326_k4dccf.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827659/Screenshot_2026-02-12_003409_iips9k.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827734/Screenshot_2026-02-12_003501_y1berp.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827793/Screenshot_2026-02-12_003620_p56qyz.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827827/Screenshot_2026-02-12_003658_arfpza.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827866/Screenshot_2026-02-12_003730_pensma.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827932/Screenshot_2026-02-12_003845_auwqqx.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770827962/Screenshot_2026-02-12_003913_rnzpht.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770828053/Screenshot_2026-02-12_004043_vhqyev.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770828127/Screenshot_2026-02-12_004159_plupjg.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770828164/Screenshot_2026-02-12_004235_m5jllm.png",
    ],
    link: "https://ysmael.vercel.app",
    isAlignRight: false,
    stack: ["Next.js", "Prisma", "MongoDB", "Tailwind", "Better-auth"],
  },
  {
    title: "YSMAEL mockup/prototype",
    category: "UI/UX",
    description:
      "A high-fidelity UI/UX design concept for a restaurant platform, focusing on intuitive user flows for bookings, ordering, and immersive virtual tours.",
    features: [
      "Booking System Interface",
      "Ordering Flow Prototype",
      "Interactive UI Components",
      "Design System & Style Guide",
      "User Experience (UX) Wireframes",
    ],
    images: [
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990803/Screenshot_2026-02-13_215308_rjhf1m.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990495/Screenshot_2026-02-13_214807_qtjpcy.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990479/Screenshot_2026-02-13_214748_hwvm0p.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990438/Screenshot_2026-02-13_214707_tdii0k.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990418/Screenshot_2026-02-13_214641_xeiz7k.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990411/Screenshot_2026-02-13_214617_oepsyl.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990406/Screenshot_2026-02-13_214550_j1tnzo.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990359/Screenshot_2026-02-13_214550_urwuma.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770990319/Screenshot_2026-02-13_214453_rxqb7v.png",
    ],
    link: "https://www.figma.com/design/k33YNhnUuTvOP6qhB1hqGv/YSMAEL?node-id=0-1&t=DnkVpLY6oXFf60px-1",
    isAlignRight: true,
    stack: ["Figma", "Photoshop", "UI/UX", "Prototype", "Capstone 1 Project"],
  },
  {
    title: "AyuDash Admin Dashboard",
    category: "UI/UX",
    description:
      "My school final project where I was assigned as one of the two tech lead for the whole class. I designed a dual-role admin dashboard (Barangay & Municipality) with login systems and credential management for local government.",
    features: [
      "Dual-Role Admin Dashboard (Baranggay & Municipality)",
      "Credential Management System",
      "Login & Authentication Interfaces",
      "Dashboard Overview & Analytics",
      "User Profile Management",
      "Account & Order History",
      "Registration & Sign Up Flows",
      "Contact & Support System",
      "Ticket System (Log In & Sign Up Pages)",
    ],
    images: [
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992826/Screenshot_2026-02-13_222656_envvid.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992784/Screenshot_2026-02-13_222616_dgtwi1.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992752/Screenshot_2026-02-13_222542_rojqn4.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992728/Screenshot_2026-02-13_222521_ruy813.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992703/Screenshot_2026-02-13_222454_bu18ry.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992683/Screenshot_2026-02-13_222431_j5qrmu.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992661/Screenshot_2026-02-13_222413_esess4.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770992634/Screenshot_2026-02-13_222337_kltcu9.png",
    ],
    link: "https://www.figma.com/design/cnIPyjmr0qDRSK1U3ZxlLw/AyuDash?node-id=0-1&t=JjpNq8BXLBsvoaOY-1",
    isAlignRight: false,
    stack: [
      "Figma",
      "UI/UX Design",
      "IT Elective 3 Final Project",
      "Photoshop",
    ],
  },
  {
    title: "TeachTok",
    category: "UI/UX",
    description:
      "An interactive educational application designed as my HCI final project. I served as one of the two tech lead, overseeing team collaboration, architecting the design system, and defining core features. TeachTok helps people learn using games and a cute mascot character.",
    features: [
      "Landing & Welcome Onboarding Screens",
      "Age-Based Personalization System",
      "Interactive Educational Content Display",
      "Discovery & Content Browsing",
      "Gamified Learning Mechanics",
      "Engagement & Reward System",
    ],
    images: [
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994431/Screenshot_2026-02-13_225342_jrvbgw.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994469/Screenshot_2026-02-13_225418_cgzgde.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994294/Screenshot_2026-02-13_225117_nehqnc.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994195/Screenshot_2026-02-13_224917_ug04ex.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994138/Screenshot_2026-02-13_224847_ywbbkn.png",
      "https://res.cloudinary.com/dv9zils0e/image/upload/v1770994027/Screenshot_2026-02-13_224647_iyt10p.png",
    ],
    link: "https://www.figma.com/design/TsBAgA4aPus3GUyW3MAjS6/TeachTok?node-id=0-1&p=f",
    isAlignRight: true,
    stack: [
      "Figma",
      "UI/UX Design",
      "HCI Final Project",
      "Interaction Design",
      "Figma Prototyping",
    ],
  },
];

// ─── EDUCATION ───────────────────────────────────────────────────────────────

export const EDUCATION = [
  {
    title:
      "Polytechnic University of the Philippines — Santa Maria, Bulacan Campus",
    meta: "BS Information Technology • 2022–Present",
    note: "President's Lister (1st Year to 3rd Year, 1st sem).",
  },
  {
    title: "Immaculate Conception Polytechnic",
    meta: "Senior High (ICT) • 2020–2022",
    note: "With High Honors.",
  },
  {
    title: "Catmon National High School — Catmon, Santa Maria, Bulacan",
    meta: "Junior High • 2016–2020",
    note: "With High Honors.",
  },
  {
    title: "Jose Juan Serapio Elementary School",
    meta: "Elementary • 2014–2016",
    note: "",
  },
];

export const TRAININGS = [
  "Know Your Enemy: A Fundamental Guide to Cybersecurity (Nov 28, 2025)",
  "ISKOLARIUM'S MAGSUSULAT AT MAGMUMULAT: A JOURNALIST'S BATTLECRY (Mar 30, 2023)",
];

export const OTHER_SKILLS = ["Photoshop", "Canva", "Adobe Illustrator", "CapCut"];

// ─── CONTACT ─────────────────────────────────────────────────────────────────

export const CONTACT = {
  email: "vincent.iglesia07@gmail.com",
  phone: "+63 920 334 1360",
  location: "Santa Maria, Bulacan",
  status: "Available for internship",
};
