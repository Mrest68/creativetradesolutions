"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const heroSlides = [
    '/stock1.jpg',
    '/window.svg',
    '/globe.svg'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  

  // Form handling
  // Hero carousel auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Reviews carousel auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setReviewIndex(i => (i + 1) % 5);
    }, 5000); // Change review every 5 seconds
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
      {/* Advanced cursor follower removed */}
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[85vh] flex flex-col overflow-hidden"
        style={{backgroundColor: '#353535'}}
      >
        {/* Main hero content area */}
        <div className="flex-1 flex items-center justify-center relative">
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

            {/* Background overlay removed */}
            
            {/* Floating orbs removed */}
            
            {/* Matrix rain effect */}
            {[...Array(20)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const leftPos = (i * 37 + 23) % 100; // Pseudo-random but deterministic
              const delay = (i * 0.3) % 3;
              const duration = 3 + (i * 0.2) % 2;
              const charCode = 0x30A0 + (i * 7) % 96;
              
              return (
                <div
                  key={`matrix-${i}`}
                  className="absolute animate-matrix-rain text-cyan-400 text-xs opacity-30"
                  style={{
                    left: `${leftPos}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                  }}
                >
                  {String.fromCharCode(charCode)}
                </div>
              );
            })}
            
            {/* Floating geometric shapes */}
            {[...Array(15)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPos = (i * 43 + 17) % 100;
              const leftPos = (i * 59 + 31) % 100;
              const delay = (i * 0.8) % 8;
              const duration = 8 + (i * 0.4) % 4;
              
              return (
                <div
                  key={`shape-${i}`}
                  className={`absolute animate-cosmic-drift ${
                    i % 3 === 0 ? 'w-4 h-4 bg-cyan-400/20 rotate-45' : 
                    i % 3 === 1 ? 'w-6 h-6 bg-purple-400/20 rounded-full' : 
                    'w-3 h-8 bg-pink-400/20'
                  }`}
                  style={{
                    top: `${topPos}%`,
                    left: `${leftPos}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                  }}
                />
              );
            })}
            
            {/* Dynamic grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Hero content with scroll animations — two-column */}
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Header, text, buttons */}
              <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight sm:leading-tight text-white">
                  Creative Trade
                  <br />
                  Solutions
                </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 max-w-2xl">
                  Transform your business with cutting-edge marketing strategies and modern digital experiences.
                  We build sleek, high-converting websites and campaigns that drive measurable results.
                </p>

                {/* Quick checklist highlights */}
                <div className="mb-6">
                  <ul className="flex flex-col gap-4 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Fast turnaround</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SEO & conversion focused</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#services"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 py-3 rounded-none font-semibold text-base sm:text-lg text-white border-2 transition hover:opacity-90"
                    style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
                  >
                    Services
                  </a>

                  <a
                    href="/get-started"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 py-3 rounded-none font-semibold text-base sm:text-lg bg-black text-white border-2 border-black hover:bg-gray-800 transition"
                  >
                    Start Project
                  </a>
                </div>
              </div>

              {/* Right: Image (carpenter.jpg) */}
              <div className="w-full flex items-center justify-center mt-6 md:mt-0">
                <div className="w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden ">
                  <Image src="/carpenter.jpg" alt="Carpenter at work" width={1200} height={800} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* White bottom section */}
        <div className="bg-white h-20 flex items-center justify-center relative z-10">
          <div className="text-center">
            
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <span className="text-xs font-light">Scroll to explore</span>
              <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Carousel Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Who We Work With
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specializing in trade services, we partner with businesses in remodeling, roofing, landscaping, and more to elevate their online presence and drive growth.
            </p>
          </div>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
            {[
              'emblem 1.JPG',
              'emblem 2.JPG',
              'emblem 3.JPG',
              'emblem 4.JPG',
              'emblem 5.JPG',
              'emblem 6.JPG',
              'emblem 7.JPG'
            ].map((logo, index) => (
              <div 
                key={`logo-${index}`} 
                className="flex items-center justify-center p-4  rounded-lg transition-all duration-300 "
              >
                <div className="relative w-full h-24">
                  <Image
                    src={`/logos/${logo}`}
                    alt={`Client logo ${index + 1}`}
                    fill
                    className="object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef}
        className="scroll-hidden relative py-32 px-6"
        style={{backgroundColor: '#353535'}}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Right: Content */}
            <div className={`${isLoaded ? 'animate-slide-in-right' : ''}`}>
              {/* H3 tag above H1 */}
              <h3 className="text-lg font-normal mb-4 text-gray-300 uppercase tracking-wider">
                Our Services
              </h3>
              
              {/* H1 - Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
                What We Create
              </h1>
              
              {/* H2 - Subheading */}
              <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed">
                From stunning websites to comprehensive marketing strategies, we deliver solutions that are both beautiful and effective.
              </h2>
              
              {/* Vertical bullet points */}
              <div className="space-y-6 mb-10">
                {[
                  {
                    title: "Web Development",
                    description: "Modern, responsive websites built with cutting-edge technology and sleek design."
                  },
                  {
                    title: "Targeted Marketing",
                    description: "Data-driven marketing strategies that drive growth and maximize ROI."
                  },
                  {
                    title: "Social Media Management",
                    description: "Comprehensive social media strategies that enhance brand visibility and engagement."
                  }
                ].map((service, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <svg className="w-6 h-6 mt-1 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-normal text-white mb-2">{service.title}</h4>
                      <p className="text-gray-300 font-light leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Button at the bottom */}
              <a 
                href="/get-started" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-none font-normal text-lg text-white border-2 transition-colors hover:opacity-90"
                style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
              >
                <span>Get Demo</span>
                
              </a>
            </div>
             {/* Left: Image */}
            <div className={`relative h-96 lg:h-[500px] ${isLoaded ? 'animate-slide-in-left' : ''}`}>
              <Image 
                src="/commercial-engineers-pointing-at-blueprint-sketch-scaled-1.jpg" 
                alt="Our Services and Solutions" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies We Use Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Leveraging cutting-edge tools and platforms to deliver exceptional results.
            </p>
          </div>
          
          {/* Horizontal Scrolling Tech Logos */}
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-[scroll-tech_30s_linear_infinite] hover:[animation-play-state:paused]">
              {/* First set of logos */}
              {[
                'tech 1.JPG',
                'tech 2.png',
                'tech 3.JPG',
                'tech 4.JPG',
                'tech 5.JPG',
                'tech 6.JPG',
                'tech 7.JPG'
              ].map((tech, index) => (
                <div 
                  key={`tech-set1-${index}`} 
                  className="flex-shrink-0 w-40 h-40 flex items-center justify-center p-6 transition-all duration-300 hover:scale-110"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/logos/${tech}`}
                      alt={`Technology ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                'tech 1.JPG',
                'tech 2.png',
                'tech 3.JPG',
                'tech 4.JPG',
                'tech 5.JPG',
                'tech 6.JPG',
                'tech 7.JPG'
              ].map((tech, index) => (
                <div 
                  key={`tech-set2-${index}`} 
                  className="flex-shrink-0 w-40 h-40 flex items-center justify-center p-6 transition-all duration-300 hover:scale-110"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/logos/${tech}`}
                      alt={`Technology ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — redesigned section */}
      <section id="how" className="relative py-32 px-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            {/* H2 above H1 */}
            <h2 className="text-lg font-normal mb-4 text-gray-600 uppercase tracking-wider">
              Our Process
            </h2>
            
            {/* H1 - Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black">
               Portfolio Showcase
            </h1>
            
            {/* P tag below H1 */}
            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-4xl mx-auto">
              We partner with you through a focused process designed to discover your needs, craft a tailored strategy, build delightful experiences, and launch with measurable results.
            </p>
          </div>
          
          {/* Automatic Horizontal Carousel */}
          <div className="relative group mb-20">
            {/* Mobile: simple swipeable horizontal list */}
            <div className="md:hidden overflow-x-auto -mx-6 px-6">
              <div className="flex gap-6 pb-6">
                {[
                  {
                    title: "Camino Concepts",
                    category: "Remodeling Services/Handyman Services",
                    image: "web1.jpg",
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://caminoconcepts.com"
                  },
                  {
                    title: "Novus Remodeling",
                    category: "Remodeling Services/Handyman Services",
                    image: "web2.jpg",
                    gradient: "from-purple-500 to-pink-600",
                    url: "https://www.novushomeremodeling.com/"
                  },
                  {
                    title: "Lalos Carpentry",
                    category: "Carpentry Services",
                    image: "web3.jpg",
                    gradient: "from-green-500 to-cyan-600",
                    url: "https://laloscarp.com/"
                  },
                  {
                    title: "Storm Pros Florida",
                    category: "Roofing / Impact Doors and Windows",
                    image: "web4.png",
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://stormprosflorida.com"
                  }
                ].map((project, index) => (
                  <div key={`mobile-${index}`} className="flex-shrink-0 w-80 sm:w-96">
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={`/${project.image}`}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-black mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-base mb-4">{project.category}</p>
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-4 py-2 border-2 border-black text-black font-normal text-sm text-center transition-all duration-300 hover:bg-black hover:text-white"
                        >
                          Visit Project
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated carousel for md+ */}
            <div className="hidden md:block overflow-hidden">
              <div className="flex gap-8 animate-[scroll-carousel_40s_linear_infinite] hover:[animation-play-state:paused]" style={{
                width: 'calc(512px * 8)'
              }}
              >
                {/* First set of portfolio items */}
                {[
                  {
                    title: "Camino Concepts",
                    category: "Remodeling Services/Handyman Services",
                    image: "web1.jpg",
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://caminoconcepts.com"
                  },
                  {
                    title: "Novus Remodeling",
                    category: "Remodeling Services/Handyman Services",
                    image: "web2.jpg",
                    gradient: "from-purple-500 to-pink-600",
                    url: "https://www.novushomeremodeling.com/"
                  },
                  {
                    title: "Lalos Carpentry",
                    category: "Carpentry Services",
                    image: "web3.jpg",
                    gradient: "from-green-500 to-cyan-600",
                    url: "https://laloscarp.com/"
                  },
                   {
                    title: "Storm Pros Florida",
                    category: "Roofing / Impact Doors and Windows",
                    image: "web4.png",
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://stormprosflorida.com/"
                  }
                  
                ].map((project, index) => (
                  <div key={`set1-${index}`} className="flex-shrink-0 w-96 md:w-[28rem] lg:w-[32rem]">
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      {/* Project Image */}
                      <div className="relative h-96 overflow-hidden">
                        <Image 
                          src={`/${project.image}`} 
                          alt={project.title}
                          fill
                          className="object-cover duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-8">
                        <h3 className="text-3xl font-bold text-black mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg">
                          A cutting-edge solution that combines innovative design with powerful functionality.
                        </p>
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-6 py-3 border-2 border-black text-black font-normal text-base text-center transition-all duration-300 hover:bg-black hover:text-white"
                        >
                          Visit Project
                        </a>
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
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://caminoconcepts.com"
                  },
                  {
                    title: "Novus Remodeling",
                    category: "Remodeling Services/Handyman Services",
                    image: "web2.jpg",
                    gradient: "from-purple-500 to-pink-600",
                    url: "https://www.novushomeremodeling.com/"
                  },
                  {
                    title: "Lalos Carpentry",
                    category: "Carpentry Services",
                    image: "web3.jpg",
                    gradient: "from-green-500 to-cyan-600",
                    url: "https://laloscarpentry.com"
                  },
                   {
                    title: "Storm Pros Florida",
                    category: "Roofing / Impact Doors and Windows",
                    image: "web4.png",
                    gradient: "from-cyan-500 to-blue-600",
                    url: "https://stormprosflorida.com"
                  }
                ].map((project, index) => (
                  <div key={`set2-${index}`} className="flex-shrink-0 w-96 md:w-[28rem] lg:w-[32rem]">
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      {/* Project Image */}
                      <div className="relative h-96 overflow-hidden">
                        <Image 
                          src={`/${project.image}`} 
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-8">
                        <h3 className="text-3xl font-bold text-black mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg">
                          A cutting-edge solution that combines innovative design with powerful functionality.
                        </p>
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-6 py-3 border-2 border-black text-black font-normal text-base text-center transition-all duration-300 hover:bg-black hover:text-white"
                        >
                          Visit Project
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          

        </div>
      </section>
      

      {/* Our Process Section */}
      <section className="relative py-32 px-6" style={{backgroundColor: '#353535'}}>
        <div className="max-w-7xl mx-auto">
          {/* Centered Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
              Our Process
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              Simple, transparent, and effective. Here's how we work together to grow your business.
            </p>
          </div>

          {/* Three Steps Diagram */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4 relative">
            {/* Step 1 */}
            <div className="flex-1 max-w-sm text-center">
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{backgroundColor: '#fe565f'}}>
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Initial Call<br/>(15-30 mins)
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  We'll sort through what your goals are with your business, answer any questions you have, and choose what plan works for you.
                </p>
              </div>
            </div>

            {/* Dashed Line Arrow - Desktop */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0 mt-12">
              <svg className="w-16 h-8" viewBox="0 0 64 32" fill="none">
                <path d="M0 16 L54 16 M48 10 L54 16 L48 22" stroke="#fe565f" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Vertical Dashed Arrow - Mobile */}
            <div className="md:hidden flex justify-center w-full">
              <svg className="w-8 h-12" viewBox="0 0 32 48" fill="none">
                <path d="M16 0 L16 38 M10 32 L16 38 L22 32" stroke="#fe565f" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex-1 max-w-sm text-center">
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{backgroundColor: '#fe565f'}}>
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  We Build Your System<br/>(7-14 days)
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  We'll send you a document which asks you questions about your business so we have all the information we need to start building your system. Once we get that info from you, we'll get started.
                </p>
              </div>
            </div>

            {/* Dashed Line Arrow - Desktop */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0 mt-12">
              <svg className="w-16 h-8" viewBox="0 0 64 32" fill="none">
                <path d="M0 16 L54 16 M48 10 L54 16 L48 22" stroke="#fe565f" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Vertical Dashed Arrow - Mobile */}
            <div className="md:hidden flex justify-center w-full">
              <svg className="w-8 h-12" viewBox="0 0 32 48" fill="none">
                <path d="M16 0 L16 38 M10 32 L16 38 L22 32" stroke="#fe565f" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex-1 max-w-sm text-center">
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{backgroundColor: '#fe565f'}}>
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Launch Call<br/>(20 mins)
                </h3>
                <p className="text-gray-300 font-light leading-relaxed">
                  We'll walk you through your website, google business profile, and social media. Any questions you may have will be answered, and of course, now it is time for the system to grow.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <a 
              href="/get-started" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-none font-normal text-lg text-white border-2 transition-colors hover:opacity-90"
              style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
            >
              <span>Get Started Today</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
 {/* Client Reviews Carousel */}
      <section className="relative py-16 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Automatic Horizontal Carousel - Small and Vertical */}
          <div className="relative group">
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 animate-[scroll-reviews_30s_linear_infinite] hover:[animation-play-state:paused]" 
                style={{
                  width: 'calc(320px * 10)'
                }}
              >
                {/* First set of reviews */}
                {[
                  {
                    name: "Manuel Rodriguez",
                    role: "Novus Remodeling",
                    content: "Excellent work and professional service. Highly recommend!",
                    rating: 5
                  },
                  {
                    name: "Pablo Martinez",
                    role: "Camino Concepts", 
                    content: "Creative Trade Solutions exceeded our expectations completely.",
                    rating: 5
                  },
                  {
                    name: "Eduardo Lalo",
                    role: "Lalos Carpentry",
                    content: "Professional team that delivered exactly what we needed.",
                    rating: 5
                  },
                  {
                    name: "Maria Silva",
                    role: "Silva Designs",
                    content: "Outstanding quality and attention to detail in every project.",
                    rating: 5
                  },
                  {
                    name: "Carlos Restrepo",
                    role: "Storm Pros Florida",
                    content: "Fast turnaround and exceptional results. Very satisfied!",
                    rating: 5
                  }
                ].map((review, index) => (
                  <div key={`review-set1-${index}`} className="flex-shrink-0 w-80">
                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg h-48 flex flex-col justify-between">
                      {/* Stars */}
                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Review content */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                        "{review.content}"
                      </p>
                      
                      {/* Client info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#fe565f'}}>
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-black text-sm">{review.name}</div>
                          <div className="text-gray-500 text-xs">{review.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  {
                    name: "Manuel Rodriguez",
                    role: "Novus Remodeling",
                    content: "Excellent work and professional service. Highly recommend!",
                    rating: 5
                  },
                  {
                    name: "Pablo Martinez",
                    role: "Camino Concepts", 
                    content: "Creative Trade Solutions exceeded our expectations completely.",
                    rating: 5
                  },
                  {
                    name: "Eduardo Lalo",
                    role: "Lalos Carpentry",
                    content: "Professional team that delivered exactly what we needed.",
                    rating: 5
                  },
                  {
                    name: "Maria Silva",
                    role: "Silva Designs",
                    content: "Outstanding quality and attention to detail in every project.",
                    rating: 5
                  },
                  {
                    name: "Carlos Restrepo",
                    role: "Storm Pros Florida",
                    content: "Fast turnaround and exceptional results. Very satisfied!",
                    rating: 5
                  }
                ].map((review, index) => (
                  <div key={`review-set2-${index}`} className="flex-shrink-0 w-80">
                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg h-48 flex flex-col justify-between">
                      {/* Stars */}
                      <div className="flex mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Review content */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                        "{review.content}"
                      </p>
                      
                      {/* Client info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#fe565f'}}>
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-black text-sm">{review.name}</div>
                          <div className="text-gray-500 text-xs">{review.role}</div>
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
         
{/* New Feature Section */}
      <section className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* H1 tag */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black">
              Transforming Your Vision
            </h1>
            
            {/* H2 tag under H1 */}
            <h2 className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-4xl mx-auto">
              We bring your ideas to life with precision, creativity, and cutting-edge technology
            </h2>
          </div>
          
          {/* Very large picture centered */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-5xl h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image 
                src="/web1.jpg" 
                alt="Transforming Vision" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
       
      {/*New Reviews Section */}
     

    
      
      

      {/* <section className="relative py-32 px-6 bg-[#e5e6f1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
              Our Pricing Plans
            </h1>
          </div> */}
{/*           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/web1.jpg",
                category: "Basic",
                title: "Starter Package",
                description: "Perfect for small businesses getting started online",
                bgColor: "#1a1a1a",
                textColor: "white"
              },
              {
                image: "/web2.jpg", 
                category: "Professional",
                title: "Growth Package",
                description: "Ideal for established businesses looking to expand",
                bgColor: "#f9b918",
                textColor: "black"
              },
              {
                image: "/web3.jpg",
                category: "Premium",
                title: "Enterprise Package", 
                description: "Complete solution for large-scale operations",
                bgColor: "#ff5760",
                textColor: "white"
              }
            ].map((plan, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                
                <div 
                  className="p-6 relative h-80 flex flex-col justify-between"
                  style={{backgroundColor: plan.bgColor}}
                >
                  <div>
                    <h3 
                      className="text-lg font-light mb-2 uppercase tracking-wider"
                      style={{color: plan.textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}}
                    >
                      {plan.category}
                    </h3>
                    
                    <h2 
                      className="text-2xl md:text-3xl font-light mb-4"
                      style={{color: plan.textColor}}
                    >
                      {plan.title}
                    </h2>
                    
                    <p 
                      className="font-light leading-relaxed"
                      style={{color: plan.textColor === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}}
                    >
                      {plan.description}
                    </p>
                  </div>
                  
                
                  <div className="flex justify-end mt-6">
                    <button 
                      className="group bg-transparent border-2 p-3 rounded-none transition-all duration-300 hover:opacity-75"
                      style={{
                        borderColor: plan.textColor,
                        color: plan.textColor,
                        alignSelf: 'flex-end'
                      }}
                    >
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
       {/* <section className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black">
              Latest Insights
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and strategies in digital marketing and web development.
            </p>
          </div>
          
         
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <Image
                    src="/web1.jpg"
                    alt="SEO Tips"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-4 text-black">
                    SEO Best Practices for 2024
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    Discover the latest SEO strategies that will help your business rank higher and attract more qualified leads. Learn advanced techniques and best practices.
                  </p>
                  <div className="flex items-center justify-between">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-black font-normal hover:gap-3 transition-all duration-300"
                      style={{color: '#fe565f'}}
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <button 
                      className="px-4 py-2 rounded-none font-normal text-black border-2 transition-all duration-300 hover:text-white"
                      style={{backgroundColor: '#f9b918', borderColor: '#f9b918'}}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <Image
                    src="/web2.jpg"
                    alt="Web Design Trends"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-4 text-black">
                    Modern Web Design Trends
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">
                    Explore the cutting-edge design trends that are shaping the future of web development and user experience. Stay ahead of the curve.
                  </p>
                  <div className="flex items-center justify-between">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-black font-normal hover:gap-3 transition-all duration-300"
                      style={{color: '#fe565f'}}
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <button 
                      className="px-4 py-2 rounded-none font-normal text-white border-2 transition-all duration-300 hover:opacity-90"
                      style={{backgroundColor: '#1a1a1a', borderColor: '#1a1a1a'}}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
     
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="/web3.jpg"
                      alt="Digital Marketing Strategy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  
                  <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-light mb-4 text-black">
                      Complete Digital Marketing Strategy Guide
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6 text-lg">
                      Learn how to create a comprehensive digital marketing strategy that drives results. From social media to content marketing, we cover everything you need to know to grow your business online.
                    </p>
                    <div className="flex items-center gap-4">
                      <a 
                        href="#" 
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-none font-normal text-lg text-white border-2 transition-colors hover:opacity-90"
                        style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
                      >
                        <span>Read Full Guide</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                      <span className="text-gray-500 text-sm">15 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */} 

      {/* Simple Contact Us Section */}
      <section className="relative py-16 px-6" style={{backgroundColor: '#e5e6f1'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-black">
            Contact Us
          </h2>
          <p className="text-black font-light mb-8">
            Ready to start your project? Get in touch with us today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:Adrian@creativetrade.com" 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-none font-normal text-lg text-white border-2 transition-colors hover:opacity-90"
              style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
            >
              Email Us
            </a>
            
            <a 
              href="tel:+19548708668" 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-none font-normal text-lg bg-transparent text-black border-2 border-white hover:bg-white hover:text-black transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

     
     
    </div>
  );
}
