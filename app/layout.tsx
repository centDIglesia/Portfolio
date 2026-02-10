import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { SiteNavbar } from "@/components/site-navbar";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Component as EtheralShadow  } from "@/components/etheral-shadow";


export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistMono.variable}  antialiased  relative bg-linear-to-bl from-background via-secondary to-background  `}
        suppressHydrationWarning
      >

       <div className="absolute inset-0 -z-10">
        <EtheralShadow
          sizing="fill"
          noise={{ opacity: .5, scale: 1.2 }}
          animation={{ scale: 100, speed: 50 }}
          color="rgba(255, 255, 255, .05)"
        />
      </div>

        <ParticlesBackground />
        {children}
        <SiteNavbar />
        <ProgressiveBlur
          direction="bottom"
          blurLayers={10}
          blurIntensity={1}
          className="fixed bottom-0 left-0 right-0 z-1 h-10 rounded-none"
        />
      </body>
    </html>
  );
}
