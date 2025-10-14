import { Inter, JetBrains_Mono } from "next/font/google";
import MobileNav from '../components/MobileNav';
import CTAButton from '../components/CTAButton';
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
       
        
        {/* Modern Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#353535] backdrop-blur-xl border-b border-white/10">
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
              <div className="hidden md:flex items-center gap-1 bg-transparent rounded-none px-2 ">
                <Link href="/services" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Services</Link>
                <Link href="/projects" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Projects</Link>
                
                <Link href="/get-started" className="px-6 py-2 text-white/80 hover:text-white rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Pricing</Link>
                <Link href="/#contact" className="px-6 py-2 text-white/90 rounded-none transition-all duration-300 font-medium pb-2 border-b-2 border-transparent hover:border-white">Contact</Link>
                
                {/* CTA Button */}
                <CTAButton />
              </div>
              
              {/* Mobile Menu Button */}
              <MobileNav />
            </div>
          </nav>
        </header>

        {/* Add top padding so fixed header doesn't overlap content on small screens */}
        <main className="pt-8 sm:pt-10 md:pt-12">{children}</main>
      </body>
    </html>
  );
}
