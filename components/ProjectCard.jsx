import { AnimatedProjects } from "@/components/ui/AnimatedProjects";

export default function AnimatedTestimonialsDemo() {
  const projects = [
    {
      title: "DishCover AR",
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
      stack: ["FRONT END", "Next.js", "Tailwind", "Better-auth"],
    },
    {
      title: "YSMAEL",
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
  ];

  return (
    <>
      {projects.map((p, index) => (
        <AnimatedProjects key={index} projects={[p]} className="mb-16" />
      ))}
    </>
  );
}
