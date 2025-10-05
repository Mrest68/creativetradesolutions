
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
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 py-3 rounded-none font-semibold text-base sm:text-lg text-white border-2 transition"
                    style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
                  >
                    Services
                  </a>

                  <a
                    href="#contact"
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
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-1">
              Building your business with marketing
            </h3>
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
      <section className="relative py-16 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest projects and see how we bring ideas to life with stunning design and cutting-edge technology.
            </p>
          </div>
          
          {/* Automatic Horizontal Carousel */}
          <div className="relative group">
            {/* Mobile: simple swipeable horizontal list */}
            <div className="md:hidden overflow-x-auto -mx-6 px-6">
              <div className="flex gap-6 pb-6">
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
                  <div key={`mobile-${index}`} className="flex-shrink-0 w-64 sm:w-72">
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={`/${project.image}`}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 text-white text-xs font-medium rounded" style={{backgroundColor: '#fe565f'}}>
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-black mb-1">{project.title}</h3>
                        <p className="text-gray-600 text-sm">{project.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated carousel for md+ */}
            <div className="hidden md:block overflow-hidden">
              <div className="flex gap-8 animate-[scroll-carousel_40s_linear_infinite]" style={{
                width: 'calc(384px * 8)'
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
                  <div key={`set1-${index}`} className="flex-shrink-0 w-64 sm:w-72 md:w-96">
                    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image 
                          src={`/${project.image}`} 
                          alt={project.title}
                          fill
                          className="object-cover  duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 text-white rounded-full text-sm font-medium" style={{backgroundColor: '#fe565f'}}>
                            {project.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-black mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          A cutting-edge solution that combines innovative design with powerful functionality.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#fe565f'}}></div>
                            <span className="text-gray-500 text-sm">View Project</span>
                          </div>
                          <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#fe565f'}}>
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
                  <div key={`set2-${index}`} className="flex-shrink-0 w-64 sm:w-72 md:w-96">
                    <div className="glass-card overflow-hidden transition-all duration-500 border border-white/10">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image 
                          src={`/${project.image}`} 
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700"
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
                        <h3 className="text-2xl font-bold text-black mb-2">
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
                          <svg className="w-5 h-5 text-cyan-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="scroll-hidden relative py-0"
        style={{backgroundColor: '#353535'}}
      >
        <div className="w-full h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-full">
            {/* Left: Image */}
            <div className={`relative ${isLoaded ? 'animate-slide-in-left' : ''}`}>
              <Image 
                src="/commercial-engineers-pointing-at-blueprint-sketch-scaled-1.jpg" 
                alt="Our Services and Solutions" 
                fill
                className="object-cover"
              />
            </div>
            
            {/* Right: Content */}
            <div className={`px-8 py-16 lg:px-16 lg:py-32 ${isLoaded ? 'animate-slide-in-right' : ''}`}>
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
                href="#contact" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-none font-normal text-lg text-white border-2 transition-colors"
                style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
              >
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — redesigned section */}
      <section id="how" className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* H2 above H1 */}
            <h2 className="text-lg font-normal mb-4 text-gray-600 uppercase tracking-wider">
              Our Process
            </h2>
            
            {/* H1 - Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black">
              How We Work
            </h1>
            
            {/* P tag below H1 */}
            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-4xl mx-auto">
              We partner with you through a focused process designed to discover your needs, craft a tailored strategy, build delightful experiences, and launch with measurable results.
            </p>
          </div>
          
          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Discovery",
                description: "We dig into your goals, audience, and existing assets to identify high-impact opportunities."
              },
              {
                title: "Strategy",
                description: "We design a measurable plan—website, funnels, and marketing—that aligns to revenue objectives."
              },
              {
                title: "Creation",
                description: "Design and build with a focus on conversion, performance, and brand credibility."
              },
              {
                title: "Launch & Optimize",
                description: "We deploy, monitor metrics, and iterate to continuously improve results."
              },
              {
                title: "Support & Maintenance",
                description: "Ongoing support to ensure your digital presence continues to perform at its best."
              },
              {
                title: "Growth & Scale",
                description: "Continuous optimization and expansion strategies to grow your business further."
              }
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                {/* H3 per grid item */}
                <h3 className="text-xl font-normal text-black mb-4">
                  {step.title}
                </h3>
                
                {/* P tag per grid item */}
                <p className="text-gray-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Centered button at bottom */}
          <div className="text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-none font-normal text-lg text-white border-2 transition-colors"
              style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
          {/* Technologies Carousel */}
      <section className="scroll-hidden relative py-24 px-6 overflow-hidden bg-[#fe565f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-slide-left">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-black">
              Effective Technologies For Results
            </h1>
            <p className="text-xl text-black/70 font-light max-w-2xl mx-auto">
              We use the latest technologies to build fast, scalable, and modern solutions.
            </p>
          </div>
          
          {/* 1 Row, 5 Columns Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { 
                name: "React", 
                image: "/web1.jpg",
                description: "Build dynamic user interfaces with the power of React components and modern JavaScript."
              },
              { 
                name: "Next.js", 
                image: "/web2.jpg",
                description: "Full-stack React framework for production-ready applications with SSR and optimization."
              },
              { 
                name: "Node.js", 
                image: "/web3.jpg",
                description: "Server-side JavaScript runtime for building scalable backend applications and APIs."
              },
              { 
                name: "WordPress", 
                image: "/web4.png",
                description: "Content management system for flexible, customizable websites and blogs."
              },
              { 
                name: "AWS Cloud", 
                image: "/funnel.png",
                description: "Amazon Web Services for reliable, scalable cloud infrastructure and deployment."
              }
            ].map((tech, index) => (
              <div key={`tech-${index}`} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                {/* Image */}
                <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <Image 
                    src={tech.image} 
                    alt={tech.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* H2 */}
                <h2 className="text-xl font-light text-black mb-3">
                  {tech.name}
                </h2>
                
                {/* P tag */}
                <p className="text-black/70 font-light text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
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
        {/* New Two Column Section */}
      <section className="relative pt-16 pb-32 px-6" style={{backgroundColor: '#e5e6f1'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative h-96 lg:h-[500px]">
              <Image 
                src="/web2.jpg" 
                alt="Our Story" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            {/* Right: Content */}
            <div>
              {/* H1 tag */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
                Crafting Digital Excellence
              </h1>
              
              {/* P tag under H1 */}
              <p className="text-xl text-gray-700 font-light leading-relaxed mb-8">
                We believe in the power of thoughtful design and strategic thinking. Every project we undertake is an opportunity to create something meaningful that drives real business results and connects with your audience on a deeper level.
              </p>
              
              {/* Rectangle button with no background color */}
              <button className="px-8 py-4 border-2 border-black text-black font-normal text-lg transition-all duration-300 hover:bg-black hover:text-white">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*New Reviews Section */}
      {/* Client Reviews Carousel */}
      <section className="relative py-16 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Automatic Horizontal Carousel - Small and Vertical */}
          <div className="relative group">
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 animate-[scroll-reviews_30s_linear_infinite]" 
                style={{
                  width: 'calc(320px * 10)'
                }}
                onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
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

    
      {/* Who We Work With Section */}
      <section 
        id="trades"
        ref={aboutRef}
        className="animate-on-scroll opacity-0 translate-y-10 relative py-32 px-6 transition-all duration-1000 ease-out"
        style={{backgroundColor: '#e5e6f1'}}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-black">
              Who We Work With
            </h1>
            <p className="text-xl text-black font-light leading-relaxed max-w-3xl mx-auto">
              We partner with skilled tradespeople and contractors to build their digital presence and grow their businesses.
            </p>
          </div>

          {/* Creative Trade Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🔨",
                title: "General Contractors",
                subtitle: "Remodeling & Construction",
                description: "Full-service contractors handling residential and commercial projects",
                color: "#fe565f"
              },
              {
                icon: "🪚",
                title: "Carpentry Services", 
                subtitle: "Custom Woodwork",
                description: "Skilled carpenters creating custom cabinets, trim, and woodwork",
                color: "#f59e0b"
              },
              {
                icon: "🏠",
                title: "Roofing Specialists",
                subtitle: "Roof & Storm Protection", 
                description: "Expert roofers providing installation, repair, and storm protection",
                color: "#06b6d4"
              },
              {
                icon: "🚪",
                title: "Door & Window Pros",
                subtitle: "Impact & Energy Efficient",
                description: "Specialists in impact doors, windows, and energy-efficient installations",
                color: "#8b5cf6"
              },
              {
                icon: "🔧",
                title: "Handyman Services",
                subtitle: "All-Purpose Repairs",
                description: "Versatile professionals handling maintenance and repair projects",
                color: "#10b981"
              },
              {
                icon: "🎨",
                title: "Home Improvement",
                subtitle: "Design & Renovation",
                description: "Creative professionals transforming spaces with style and functionality",
                color: "#f97316"
              }
            ].map((trade, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 ${
                  isLoaded ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Large Icon */}
                <div className="text-5xl mb-4 text-center">
                  {trade.icon}
                </div>
                
                {/* Trade Title */}
                <h3 className="text-xl font-light text-black mb-2 text-center">
                  {trade.title}
                </h3>
                
                {/* Subtitle with colored accent */}
                <div className="text-center mb-4">
                  <span 
                    className="text-sm font-normal px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${trade.color}20`, color: trade.color }}
                  >
                    {trade.subtitle}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-black text-sm leading-relaxed text-center font-light">
                  {trade.description}
                </p>
                
                {/* Decorative line */}
                <div 
                  className="w-12 h-0.5 mx-auto mt-4 rounded-full"
                  style={{ backgroundColor: trade.color }}
                ></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-black font-light mb-8 text-lg">
              Ready to take your trade business to the next level?
            </p>
            <a 
              href="#contact" 
              className="group text-white px-8 py-4 rounded-none font-normal text-lg transition-all duration-300 border-2"
              style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
            >
              <span>Partner With Us</span>
              <svg className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      

      {/*new prices section */}
      <section className="relative py-32 px-6 bg-[#e5e6f1]">
        <div className="max-w-7xl mx-auto">
          {/* H1 Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
              Our Pricing Plans
            </h1>
          </div>
          
          {/* Three Cards in One Row */}
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
                {/* Top 1/3 - Picture */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Bottom 2/3 - Solid Background with Content */}
                <div 
                  className="p-6 relative h-80 flex flex-col justify-between"
                  style={{backgroundColor: plan.bgColor}}
                >
                  {/* Content */}
                  <div>
                    {/* H3 Tag */}
                    <h3 
                      className="text-lg font-light mb-2 uppercase tracking-wider"
                      style={{color: plan.textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}}
                    >
                      {plan.category}
                    </h3>
                    
                    {/* H2 Tag */}
                    <h2 
                      className="text-2xl md:text-3xl font-light mb-4"
                      style={{color: plan.textColor}}
                    >
                      {plan.title}
                    </h2>
                    
                    {/* Description */}
                    <p 
                      className="font-light leading-relaxed"
                      style={{color: plan.textColor === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}}
                    >
                      {plan.description}
                    </p>
                  </div>
                  
                  {/* Button with Arrow in Bottom Right Corner */}
                  <div className="flex justify-end mt-6">
                    <button 
                      className="group bg-transparent border-2 p-3 rounded-none transition-all duration-300"
                      style={{
                        borderColor: plan.textColor,
                        color: plan.textColor,
                        alignSelf: 'flex-end'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = plan.textColor;
                        e.target.style.color = plan.bgColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = plan.textColor;
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
      </section>
      {/* Blog Section */}
      <section className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Centered Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black">
              Latest Insights
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and strategies in digital marketing and web development.
            </p>
          </div>
          
          {/* Two Cards Side by Side - Centered */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {/* Card 1 */}
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
              
              {/* Card 2 */}
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
                      className="px-4 py-2 rounded-none font-normal text-white border-2 transition-all duration-300 hover:text-gray-300"
                      style={{backgroundColor: '#1a1a1a', borderColor: '#1a1a1a'}}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#000000';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#1a1a1a';
                        e.target.style.color = 'white';
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal Card Spanning Width of Vertical Cards */}
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section - 1/3 width */}
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="/web3.jpg"
                      alt="Digital Marketing Strategy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content Section - 2/3 width */}
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
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-none font-normal text-lg text-white border-2 transition-colors"
                        style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
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
      </section>


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
              className="inline-flex items-center gap-3 px-6 py-3 rounded-none font-normal text-lg text-white border-2 transition-colors"
              style={{backgroundColor: '#fe565f', borderColor: '#fe565f'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fe565f'}
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

     
      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-white/10 bg-black">
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
                <Link href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
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
                <li className="text-white/70">Adrian@creativetrade.com</li>
                
                
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
