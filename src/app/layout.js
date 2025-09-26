import { Inter, JetBrains_Mono } from "next/font/google";
import MobileNav from '../components/MobileNav';
import Link from 'next/link';
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Creative Trade Solutions | Modern Marketing & Business Growth",
  description: "Transform your business with cutting-edge marketing solutions and modern design strategies. We build spacey, sleek digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body
        className={`${interFont.variable} ${jetBrainsMono.variable} antialiased font-sans overflow-x-hidden`}
      >
        {/* Animated Space Background */}
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
          {/* Main space gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Nebula effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(236,72,153,0.06),transparent_70%)]"></div>
          
          {/* Animated stars */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-stars-twinkle"></div>
          <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-stars-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-stars-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-1/3 w-0.5 h-0.5 bg-pink-300 rounded-full animate-stars-twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-300 rounded-full animate-stars-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-20 right-40 w-0.5 h-0.5 bg-white rounded-full animate-stars-twinkle" style={{animationDelay: '3s'}}></div>
          
          {/* Floating space particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full animate-parallax-float"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-parallax-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-pink-400/20 rounded-full animate-parallax-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-parallax-float" style={{animationDelay: '1s'}}></div>
          
          {/* Shooting stars/meteors */}
          <div className="absolute w-1 h-20 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-meteor" style={{animationDelay: '5s'}}></div>
          <div className="absolute w-0.5 h-16 bg-gradient-to-b from-purple-400 to-transparent rounded-full animate-meteor" style={{animationDelay: '8s'}}></div>
        </div>
        
        {/* Modern Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black backdrop-blur-xl border-b border-white/10">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 md:py-6">
            <div className="flex items-center justify-between">
              {/* Home icon (left) */}
              <div className="flex items-center">
                <Link href="/" className="inline-flex items-center gap-3 text-white/90 hover:text-white">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Navigation Links (center/right) */}
              <div className="hidden md:flex items-center gap-1 bg-transparent rounded-none px-2 py-2 border border-white/10">
                <Link href="/services" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Services</Link>
                <Link href="/projects" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Projects</Link>
                
                <Link href="/get-started" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Pricing</Link>
                <Link href="/#contact" className="px-6 py-2 text-white/90 rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Contact</Link>
              </div>
              
              {/* Mobile Menu Button */}
              <MobileNav />
            </div>
          </nav>
        </header>

        {/* Add top padding so fixed header doesn't overlap content on small screens */}
        <main className="pt-16 sm:pt-20 md:pt-24">{children}</main>
      </body>
    </html>
  );
}
