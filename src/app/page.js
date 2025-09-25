
"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const cursorRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    '/stock1.jpg',
    '/window.svg',
    '/globe.svg'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Custom cursor trail effect
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
      
      // Parallax effects
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${window.pageYOffset * speed}px)`;
      });

      const parallaxMedium = document.querySelectorAll('.parallax-medium');
      parallaxMedium.forEach(el => {
        const speed = 0.3;
        el.style.transform = `translateY(${window.pageYOffset * speed}px)`;
      });

      const parallaxFast = document.querySelectorAll('.parallax-fast');
      parallaxFast.forEach(el => {
        const speed = 0.8;
        el.style.transform = `translateY(${window.pageYOffset * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Advanced Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delays
          setTimeout(() => {
            entry.target.classList.add('scroll-visible');
            entry.target.classList.remove('scroll-hidden');
            
            // Handle animate-on-scroll elements
            if (entry.target.classList.contains('animate-on-scroll')) {
              entry.target.classList.remove('opacity-0', 'translate-y-10');
              entry.target.classList.add('opacity-100', 'translate-y-0');
            }
            
            // Add magnetic hover effect to interactive elements
            if (entry.target.classList.contains('magnetic-element')) {
              entry.target.addEventListener('mouseenter', () => {
                // Only scale on hover — remove rotation to prevent border/element rotate
                entry.target.style.transform = 'scale(1.05)';
              });
              entry.target.addEventListener('mouseleave', () => {
                entry.target.style.transform = 'scale(1)';
              });
            }
          }, index * 100);
        }
      });
    }, observerOptions);

    // Observe elements with scroll animations
    const animatedElements = document.querySelectorAll('.scroll-hidden, .scroll-slide-left, .scroll-slide-right, .animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Mouse trail effect
  useEffect(() => {
    const trail = [];
    const trailLength = 5;

    const handleMouseMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      
      if (trail.length > trailLength) {
        trail.shift();
      }

      // Create trailing particles
      trail.forEach((point, index) => {
        const particle = document.createElement('div');
        particle.className = 'fixed pointer-events-none w-2 h-2 bg-cyan-400/30 rounded-full z-50';
        particle.style.left = point.x + 'px';
        particle.style.top = point.y + 'px';
        particle.style.transform = `scale(${(index + 1) / trailLength})`;
        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 500);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [])

  // Form handling
  // Hero carousel auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        e.target.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* Advanced cursor follower */}
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out backdrop-blur-sm border border-cyan-400/20"
        style={{
          transform: `scale(${isLoaded ? 1 : 0})`,
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
        }}
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic parallax background */}
        <div className="absolute inset-0 -z-10">
          {/* Background slides rendered behind decorative elements */}
          {heroSlides.map((src, i) => (
            <div
              key={`hero-slide-${i}`}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${src})`,
                opacity: heroIndex === i ? 1 : 0,
                transform: 'translateZ(0)'
              }}
            />
          ))}

          {/* Dark overlay for legibility (darker tint) */}
          <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>
          
          {/* Interactive floating orbs */}
          <div className="parallax-slow absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-quantum-levitate"></div>
          <div className="parallax-medium absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-pink-500/15 rounded-full blur-3xl animate-cosmic-drift" style={{animationDelay: '1s'}}></div>
          <div className="parallax-fast absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-portal-spin" style={{animationDelay: '2s'}}></div>
          
          {/* Matrix rain effect */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`matrix-${i}`}
              className="absolute animate-matrix-rain text-cyan-400 text-xs opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
          
          {/* Floating geometric shapes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className={`absolute animate-cosmic-drift ${
                i % 3 === 0 ? 'w-4 h-4 bg-cyan-400/20 rotate-45' : 
                i % 3 === 1 ? 'w-6 h-6 bg-purple-400/20 rounded-full' : 
                'w-3 h-8 bg-pink-400/20'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Dynamic grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Hero content with scroll animations */}
        <div className={`max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <h1 className="text-6xl md:text-9xl font-bold mb-8 leading-tight text-white">
            Creative Trade
            <br />
            Solutions
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed hover:text-white/90 transition-colors duration-500">
            Transform your business with cutting-edge marketing strategies and modern digital experiences. 
            We create spacey, sleek solutions that drive results in the digital cosmos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#services" 
              className="group magnetic-element glass px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animate-tilt-shaking"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Explore Services
              </span>
              <svg className="inline-block ml-3 w-6 h-6 text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a 
              href="#contact" 
              className="group magnetic-element bg-gradient-to-r from-cyan-500 to-purple-500 px-10 py-5 rounded-full font-semibold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="inline-block ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Interactive floating elements */}
        <div className="absolute top-1/4 left-10 w-6 h-6 bg-cyan-400/40 rounded-full animate-parallax-float cursor-pointer hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute top-3/4 right-10 w-8 h-8 bg-purple-400/30 rounded-full animate-parallax-float cursor-pointer hover:scale-150 transition-transform duration-300" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full animate-parallax-float cursor-pointer hover:scale-150 transition-transform duration-300" style={{animationDelay: '2s'}}></div>
      </section>
      {/* Portfolio Carousel Section */}
      <section className="scroll-hidden relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-slide-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our latest projects and see how we bring ideas to life with stunning design and cutting-edge technology.
            </p>
          </div>
          
          {/* Automatic Horizontal Carousel */}
          <div className="relative group">
            <div className="overflow-hidden">
              <div className="flex gap-8" style={{
                animation: 'scroll-carousel 40s linear infinite',
                width: 'calc(400px * 12)' // 6 items * 2 sets
              }}
              onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
              >
                {/* First set of portfolio items */}
                {[
                  {
                    title: "Camino Concepts",
                    category: "Remodeling Services/Handyman Services",
                    image: "web1.jpg",
                    gradient: "from-cyan-500 to-blue-600"
                  },
                  {
                    title: "Novus Remodeling",
                    category: "Remodeling Services/Handyman Services",
                    image: "web2.jpg",
                    gradient: "from-purple-500 to-pink-600"
                  },
                  {
                    title: "Lalos Carpentry",
                    category: "Carpentry Services",
                    image: "web3.jpg",
                    gradient: "from-green-500 to-cyan-600"
                  },
                   {
                    title: "Storm Pros Florida",
                    category: "Roofing / Impact Doors and Windows",
                    image: "web4.png",
                    gradient: "from-cyan-500 to-blue-600"
                  }
                  
                ].map((project, index) => (
                  <div key={`set1-${index}`} className="flex-shrink-0 w-96 group cursor-pointer magnetic-element">
                    <div className="glass-card overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/10">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-medium`}>
                            {project.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/70 mb-4">
                          A cutting-edge solution that combines innovative design with powerful functionality.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}></div>
                            <span className="text-white/60 text-sm">View Project</span>
                          </div>
                          <svg className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  {
                    title: "Camino Concepts",
                    category: "Remodeling Services/Handyman Services",
                    image: "web1.jpg",
                    gradient: "from-cyan-500 to-blue-600"
                  },
                  {
                    title: "Novus Remodeling",
                    category: "Remodeling Services/Handyman Services",
                    image: "web2.jpg",
                    gradient: "from-purple-500 to-pink-600"
                  },
                  {
                    title: "Lalos Carpentry",
                    category: "Carpentry Services",
                    image: "web3.jpg",
                    gradient: "from-green-500 to-cyan-600"
                  },
                   {
                    title: "Storm Pros Florida",
                    category: "Roofing / Impact Doors and Windows",
                    image: "web4.png",
                    gradient: "from-cyan-500 to-blue-600"
                  }
                ].map((project, index) => (
                  <div key={`set2-${index}`} className="flex-shrink-0 w-96 group cursor-pointer magnetic-element">
                    <div className="glass-card overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/10">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-medium`}>
                            {project.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/70 mb-4">
                          A cutting-edge solution that combines innovative design with powerful functionality.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}></div>
                            <span className="text-white/60 text-sm">View Project</span>
                          </div>
                          <svg className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef}
        className="scroll-hidden relative py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              What We Create
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From stunning websites to comprehensive marketing strategies, we deliver solutions that are both beautiful and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                description: "Modern, responsive websites built with cutting-edge technology and sleek design. Integrated with powerful email and phone number funnels to capture leads effectively.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "Targeted Marketing",
                description: "Data-driven marketing strategies that drive growth and maximize ROI. A/B testing, analytics, and optimization to ensure success on Google and Facebook platforms.",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Social Media Management",
                description: "Comprehensive social media strategies that enhance brand visibility and engagement. Make your business stand out on platforms like Instagram and Facebook for credibility.",
                color: "from-green-500 to-teal-500"
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`group glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-white/10 ${
                  isLoaded ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
               
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className={`w-full h-1 bg-gradient-to-r ${service.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Process Animation Chain */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-32 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              How We Work
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience our revolutionary step-by-step journey to digital excellence.
            </p>
          </div>

          {/* Vertical Animation Chain */}
          <div className="relative">
            {/* Modern Vertical Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600/30 via-slate-500/50 to-slate-600/30 transform -translate-x-0.5 rounded-full"></div>
            
            {/* Enhanced Animated Pulse Line */}
            <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-300/40 to-transparent transform -translate-x-0.5 animate-laser-beam opacity-70 rounded-full"></div>
            
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We dive deep into understanding your business, goals, local market and challenges through comprehensive research and analysis.",
                icon: "🔍",
                color: "from-slate-700/40 to-slate-900/60",
                glowColor: "slate-300",
                borderColor: "border-slate-400/20 hover:border-slate-300/40"
              },
              {
                step: "02", 
                title: "Strategy",
                description: "We craft a tailored strategy that aligns with your objectives and market positioning for maximum impact.",
                icon: "🎯",
                color: "from-slate-800/40 to-gray-900/60",
                glowColor: "slate-300",
                borderColor: "border-slate-400/20 hover:border-slate-300/40"
              },
              {
                step: "03",
                title: "Creation",
                description: "Our experts bring your vision to life with cutting-edge technology and innovative design solutions to bring your business to life.",
                icon: "⚡",
                color: "from-gray-700/40 to-slate-900/60",
                glowColor: "slate-300",
                borderColor: "border-slate-400/20 hover:border-slate-300/40"
              },
              {
                step: "04",
                title: "Launch",
                description: "We deploy, monitor, and optimize for maximum impact, ensuring your success in the digital landscape. Our team is dedicated to your growth. If you win, we win.",
                icon: "🚀",
                color: "from-gray-800/40 to-slate-900/60",
                glowColor: "slate-300",
                borderColor: "border-slate-400/20 hover:border-slate-300/40"
              }
            ].map((process, index) => (
              <div 
                key={index}
                className="relative mb-32 last:mb-0"
              >
                {/* Large Process Card */}
                <div className={`animate-on-scroll opacity-0 translate-y-20 transition-all duration-1000 ease-out ${index % 2 === 0 ? 'ml-auto pl-16' : 'mr-auto pr-16'} max-w-2xl`}
                     style={{ transitionDelay: `${index * 200}ms` }}>
                  
                  <div className={`relative group backdrop-blur-xl bg-slate-900/30 hover:bg-slate-800/40 p-12 rounded-2xl ${process.borderColor} border transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 shadow-2xl hover:shadow-slate-500/20`}>
                    
                    {/* Enhanced Glow Effect on Scroll */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${process.color}`}
                         style={{
                           boxShadow: `0 25px 50px -12px rgba(71, 85, 105, 0.25), 0 0 40px rgba(148, 163, 184, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                         }}></div>
                    
                    {/* Modern Step Number Badge */}
                    <div className="absolute -top-6 -left-6 w-14 h-14 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl flex items-center justify-center border border-slate-500/30 group-hover:border-slate-400/50 transition-all duration-500 shadow-lg group-hover:shadow-slate-500/30">
                      <span className={`text-xl font-bold font-['SF_Mono',Monaco,monospace] text-slate-200 group-hover:text-white tracking-tight`}>
                        {process.step}
                      </span>
                    </div>
                    
                    {/* Enhanced Icon with Modern Animation */}
                    <div className="text-7xl mb-8 transform group-hover:scale-110 transition-transform duration-500">
                      {process.icon}
                    </div>
                    
                    {/* Modern Typography */}
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-6 text-slate-100 font-['SF_Pro_Display',system-ui,sans-serif] tracking-tight leading-tight group-hover:text-white transition-all duration-500">
                        {process.title}
                      </h3>
                      <p className="text-lg text-slate-300 leading-relaxed font-['SF_Pro_Text',system-ui,sans-serif] font-normal group-hover:text-slate-200 transition-colors duration-500">
                        {process.description}
                      </p>
                    </div>
                    
                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}>
                      
                    </div>
                  </div>
                </div>
                
                {/* Modern Connection Node */}
                <div className={`absolute top-16 left-1/2 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl transform -translate-x-4 animate-pulse border border-slate-400/40 shadow-lg`}
                     style={{ animationDelay: `${index * 0.5}s` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section 
        id="about"
        ref={aboutRef}
        className="animate-on-scroll opacity-0 translate-y-10 relative py-32 px-6 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className={`${isLoaded ? 'animate-slide-in-left' : ''}`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                Innovation
                <br />
                Meets Execution
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                We are a team of passionate creators, strategists, and technologists who believe in the power of great design and smart technology to transform businesses.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: "", title: "Strategic Approach", desc: "Every project starts with a deep understanding of your goals." },
                  { icon: "", title: "Cutting-Edge Tech", desc: "We use the latest technologies and frameworks for optimal results." },
                  { icon: "", title: "Results-Driven", desc: "Our focus is on delivering measurable business outcomes." }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center text-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/70">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a 
                href="#contact" 
                className="group glass px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Let's Work Together
                </span>
                <svg className="inline-block ml-2 w-5 h-5 text-pink-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            {/* Right: Visual Element */}
            <div className={`relative ${isLoaded ? 'animate-slide-in-right' : ''}`}>
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-3xl rotate-6"></div>
                
                {/* Main card */}
                <div className="relative glass-card p-8">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                        50+
                      </div>
                      <div className="text-white/70 text-sm">Projects Delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        100%
                      </div>
                      <div className="text-white/70 text-sm">Client Satisfaction</div>
                    </div>
                  </div>
                  
                  <div className="h-40 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-pulse-glow flex items-center justify-center text-2xl">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Technologies Carousel */}
      <section className="scroll-hidden relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-slide-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Cutting-Edge Tools
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We use the latest technologies to build fast, scalable, and modern solutions.
            </p>
          </div>
          
          {/* Technology Icons Carousel */}
          <div className="relative group">
            <div className="overflow-hidden">
              <div className="flex gap-12 items-center py-8 hover:animation-play-state-paused" style={{
                animation: 'scroll-carousel 35s linear infinite',
                width: 'calc(120px * 16)', // 8 items * 2 sets
                animationPlayState: 'running'
              }}
              onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
              >
                {/* First set */}
                {[
                  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
                  { name: "Next.js", icon: "🔼", color: "from-gray-400 to-gray-600" },
                  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
                  { name: "Python", icon: "🐍", color: "from-yellow-600 to-blue-500" },
                  { name: "AWS", icon: "☁️", color: "from-blue-400 to-cyan-500" },
                  { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500" },
                  { name: "GraphQL", icon: "🔗", color: "from-pink-400 to-purple-500" },
                  { name: "MongoDB", icon: "🍃", color: "from-green-400 to-emerald-500" }
                ].map((tech, index) => (
                  <div key={`tech1-${index}`} className="flex-shrink-0 w-28 group magnetic-element cursor-pointer">
                    <div className="glass-card p-6 text-center hover:bg-white/15 transition-all duration-500 transform hover:scale-110 border border-white/10">
                      <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <div className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
                  { name: "Next.js", icon: "🔼", color: "from-gray-400 to-gray-600" },
                  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
                  { name: "Python", icon: "🐍", color: "from-yellow-600 to-blue-500" },
                  { name: "AWS", icon: "☁️", color: "from-blue-400 to-cyan-500" },
                  { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500" },
                  { name: "GraphQL", icon: "🔗", color: "from-pink-400 to-purple-500" },
                  { name: "MongoDB", icon: "🍃", color: "from-green-400 to-emerald-500" }
                ].map((tech, index) => (
                  <div key={`tech2-${index}`} className="flex-shrink-0 w-28 group magnetic-element cursor-pointer">
                    <div className="glass-card p-6 text-center hover:bg-white/15 transition-all duration-500 transform hover:scale-110 border border-white/10">
                      <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <div className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="scroll-hidden relative py-32 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              What Clients Say
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content: "Creative Trade Solutions transformed our digital presence completely. The results exceeded our expectations.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Founder, GrowthCo",
                content: "Professional, creative, and results-driven. They delivered exactly what we needed to scale our business.",
                rating: 5
              },
              {
                name: "Lisa Rodriguez",
                role: "Marketing Director",
                content: "The attention to detail and modern approach made all the difference. Highly recommend their services.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`glass-card p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 ${
                  isLoaded ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#D4AF37" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="scroll-hidden relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Testimonials
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              What our clients say about partnering with Creative Trade Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group relative p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 glass-card scroll-slide-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center text-xl text-white font-bold">
                  AB
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">Ava Brooks</h4>
                    <span className="text-white/50 text-sm">• CEO, Nova Retail</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{color: '#D4AF37'}}>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                "Creative Trade rebuilt our online store and tripled conversion rates in three months. Their strategic approach and attention to detail are unmatched."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 glass-card scroll-slide-up">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl text-white font-bold">
                  MJ
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">Marcus Jin</h4>
                    <span className="text-white/50 text-sm">• Head of Marketing, GrowthLabs</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{color: '#D4AF37'}}>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                "Their marketing and SEO work delivered measurable results — organic traffic and qualified leads increased dramatically. Highly recommended."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 glass-card scroll-slide-right">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-xl text-white font-bold">
                  RS
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">Rita Sanchez</h4>
                    <span className="text-white/50 text-sm">• Product Manager, FinanceFlow</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{color: '#D4AF37'}}>
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                "The team brought our mobile product to life with beautiful UX and rock-solid performance. Support during launch was exceptional."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section 
        id="contact" 
        className="scroll-hidden relative py-32 px-6 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-slide-left">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 animate-text-glow text-white">
              Let's Create
              <br />
              Something Amazing
            </h2>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Let's discuss your project and launch it into the digital cosmos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info Cards */}
            <div className="space-y-6 scroll-slide-left">
              <div className="glass-card p-6 rounded-2xl magnetic-element hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Email Us</h3>
                    <p className="text-cyan-300">hello@creativetrade.com</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl magnetic-element hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Call Us</h3>
                    <p className="text-green-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl magnetic-element hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                    🌍
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Visit Us</h3>
                    <p className="text-purple-300">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl magnetic-element hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl" style={{background: 'linear-gradient(to right, #D4AF37, #B8860B)'}}>
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Response Time</h3>
                    <p style={{color: '#D4AF37'}}>Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Contact Form */}
            <div className="scroll-slide-right">
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 relative overflow-hidden">
                {/* Form background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 -z-10"></div>
                
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r white bg-clip-text text-transparent">
                    Send us a message
                  </h3>
                  <p className="text-white/70">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Name *
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="modern-input w-full px-4 py-3 rounded-xl focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="modern-input w-full px-4 py-3 rounded-xl focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="modern-input w-full px-4 py-3 rounded-xl focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Business Type
                  </label>
                  <input 
                    type="text" 
                    name="businessType"
                    className="modern-input w-full px-4 py-3 rounded-xl focus:outline-none"
                    placeholder="e.g., Tech Startup, Restaurant"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Project Details *
                </label>
                <textarea 
                  name="leadGen" 
                  rows={4}
                  required
                  className="modern-input w-full px-4 py-3 rounded-xl focus:outline-none resize-none"
                  placeholder="Tell us about your project, goals, and how we can help..."
                />
              </div>
              
                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button 
                      type="submit"
                      className="group magnetic-element bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl relative overflow-hidden"
                    >
                      <span className="relative z-10">Launch Project</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg className="inline-block ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-3 text-white/60">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">We'll respond within 24 hours</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Creative Trade Solutions
              </div>
              <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                Transforming businesses with cutting-edge marketing strategies and modern digital experiences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Web Development</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="text-white/70 hover:text-cyan-400 transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact</h3>
              <ul className="space-y-3">
                <li className="text-white/70">hello@creativetrade.com</li>
                <li className="text-white/70">+1 (555) 123-4567</li>
                <li className="text-white/70">San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Creative Trade Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
