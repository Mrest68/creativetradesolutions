import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-8 py-8">
        <nav className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="flex gap-10 justify-center w-full bg-white/10 rounded-full py-3 px-8 shadow-lg backdrop-blur-md">
            <a href="#services" className="text-lg font-medium text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-full hover:bg-white/10">Services</a>
            <a href="#about" className="text-lg font-medium text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-full hover:bg-white/10">About</a>
            <a href="#projects" className="text-lg font-medium text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-full hover:bg-white/10">Projects</a>
            <a href="#contact" className="text-lg font-medium text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-full hover:bg-white/10">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex min-h-screen relative">
        {/* Left side with dark overlay */}
        <div className="w-1/2 relative bg-gray-800">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Right side with content */}
        <div className="w-1/2 bg-yellow-400 p-16 flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="text-lg font-semibold mb-4 block">01</span>
            <h1 className="text-[5rem] leading-[1.1] font-bold mb-8 -ml-[30%] text-white mix-blend-difference relative w-[150%]">We provide effective<br />contracting services</h1>
            <p className="text-2xl mb-12 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur sit id quis magna imperiet
              neque magnis nam eu volutpat tellus est elit aliquam ut suscipit.
            </p>
            <div className="flex gap-6">
              <a 
                href="#quote" 
                className="bg-black text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                Get a quote
                <span className="text-2xl">→</span>
              </a>
              <a 
                href="#contact" 
                className="px-10 py-5 rounded-full border-2 border-black text-xl font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
