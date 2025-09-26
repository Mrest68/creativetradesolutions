'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('scroll-visible');
            entry.target.classList.remove('scroll-hidden');
            
            if (entry.target.classList.contains('animate-on-scroll')) {
              entry.target.classList.remove('opacity-0', 'translate-y-10');
              entry.target.classList.add('opacity-100', 'translate-y-0');
            }
          }, index * 200);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-hidden, .animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Camino Concepts",
      category: "Home Remodeling/Handyman Services",
      description: "A complete online makeover for a home remodeling business, including a sleek website with portfolio showcase, SEO optimization, and integrated booking system to drive customer engagement and conversions.",
      technologies: ["Next.js", "React", "Resender", , "Stripe","Facebook Ads", "Google Ads"],
     
      color: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-900/20 to-pink-900/20",
      image: "web1.jpg",
      review: "Professional, creative, and results-driven. They delivered exactly what we needed to scale our business and add some professionalism to our brand.",
      clientName: "Pablo",
      clientTitle: "Owner, Camino Concepts"
    },
    {
      id: 2,
      title: "Lalos Carpentry",
      category: "Custom Carpentry Services",
      description: "The attention to detail and modern approach made all the difference. Highly recommend their services. They represented us well and made us look very professional.",
      technologies: ["Google Analytics", "Google Ads", "Facebook Ads", "SEO Tools", "Adobe Creative", "Figma", "Next.js", "React", "Resender", , "Stripe"],
     
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      image: "web3.jpg",
      review: "Working with Creative Trade Solutions was the best investment we made for our carpentry business. Our bookings doubled and we're now the go-to custom carpentry service in our area. Professional work!",
      clientName: "Lalos",
      clientTitle: "Master Carpenter, Lalos Carpentry"
    },
    {
      id: 3,
      title: "Novus Remodeling",
      category: "Bathroom and home remodeling services",
      description: "Creative Trade Solutions transformó por completo nuestra presencia digital. Nos ayudó no solo a captar nuevos clientes potenciales, sino también a convertirlos en clientes.",
      technologies: ["Next.js", "React", "Resender", , "Stripe"],
      
      color: "from-green-400 to-emerald-400",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      image: "web2.jpg",
      review: "The team at Creative Trade Solutions exceeded all our expectations. Our new website looks incredible and we've seen a 400% increase in consultation requests. They really understand the remodeling industry!",
      clientName: "Manuel",
      clientTitle: "Owner, Novus Remodeling"
    },
    {
      id: 4,
      title: "Storm Pros Florida",
      category: "Roofing | Impact Doors & Windows",
      description: "Boosted the scale and reach of a leading roofing and impact windows company through a comprehensive digital overhaul, including a modern website, SEO strategies, and targeted marketing campaigns.",
      technologies: ["Next.js", "React", "Resender", "Stripe", "Facebook Ads", "Google Ads"],
      
      color: "from-yellow-600 to-yellow-500",
      bgGradient: "from-yellow-900/20 to-yellow-800/20",
      image: "web4.png",
      review: "Creative Trade Solutions helped us become the top roofing company in South Florida. Their digital marketing strategies brought in over $2M in new business this year alone. Absolutely phenomenal results!",
      clientName: "Santiago Escobar",
      clientTitle: "CEO, Storm Pros Florida"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra Modern Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
  {/* Dynamic Floating Orbs (responsive) */}
  <div className="absolute top-10 left-4 sm:left-10 w-40 sm:w-[500px] h-40 sm:h-[500px] bg-gradient-to-r from-purple-500/15 via-cyan-500/20 to-pink-500/15 rounded-full blur-3xl animate-cosmic-drift"></div>
  <div className="absolute bottom-10 right-4 sm:right-10 w-36 sm:w-[400px] h-36 sm:h-[400px] bg-gradient-to-r from-cyan-500/15 via-emerald-500/20 to-blue-500/15 rounded-full blur-3xl animate-cosmic-drift" style={{animationDelay: '2s', animationDuration: '12s'}}></div>
  <div className="absolute top-1/2 left-1/3 w-28 sm:w-[300px] h-28 sm:h-[300px] bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-indigo-500/10 rounded-full blur-3xl animate-cosmic-drift" style={{animationDelay: '4s', animationDuration: '15s'}}></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
        
        {/* Floating Geometric Shapes */}
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to prevent hydration issues
          const topPercent = ((i * 37 + 23) % 100);
          const leftPercent = ((i * 41 + 17) % 100);
          const delay = ((i * 0.5) % 10);
          const duration = (10 + ((i * 0.5) % 10));
          
          return (
            <div
              key={`shape-${i}`}
              className={`absolute animate-cosmic-drift ${
                i % 4 === 0 ? 'w-2 h-2 bg-cyan-400/30 rounded-full' : 
                i % 4 === 1 ? 'w-3 h-3 bg-purple-400/30 rotate-45' : 
                i % 4 === 2 ? 'w-1 h-6 bg-pink-400/30 rounded-full' :
                'w-4 h-1 bg-emerald-400/30 rounded-full'
              }`}
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
        
        {/* Moving Light Rays */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-pink-500/50 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Hero Section */}
  <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">
                Our Portfolio
              </span>
              <br />
              <span className="text-white/90">Digital Creations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Explore our collection of successful projects and digital transformations. 
              Each folder contains a story of innovation and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Column Layout */}
  <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-40">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`animate-on-scroll opacity-0 transition-all duration-1000 ease-out ${
                index % 2 === 0 
                  ? 'lg:translate-x-[-100px]' 
                  : 'lg:translate-x-[100px]'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Modern Column Layout */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
              }`}>
                
                {/* Project Visual */}
                <div className={`relative group ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative">
                    {/* Dramatic Glow Effect */}
                    <div className={`absolute -inset-6 bg-gradient-to-r ${project.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                    
                    {/* Main Image Container */}
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-700"
                         style={{
                           background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)`,
                           boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                         }}>
                      
                      {/* Background Gradient */}
                      <Image src={`/${project.image}`} alt={`${project.title} background`} fill className="absolute inset-0 object-cover" />
                      
                      
                      {/* Project Preview Content */}
                      
                      
                      {/* Floating Particles */}
                      {[...Array(12)].map((_, i) => {
                        // Use deterministic values based on project index and particle index
                        const topPercent = (10 + ((index * 11 + i * 19 + 7) % 80));
                        const leftPercent = (10 + ((index * 13 + i * 23 + 11) % 80));
                        const delay = ((index * 0.3 + i * 0.25) % 3);
                        const duration = (2 + ((index * 0.2 + i * 0.15) % 2));
                        
                        return (
                          <div
                            key={`particle-${index}-${i}`}
                            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-40`}
                            style={{
                              top: `${topPercent}%`,
                              left: `${leftPercent}%`,
                              animationDelay: `${delay}s`,
                              animationDuration: `${duration}s`
                            }}
                          />
                        );
                      })}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                    
                    {/* Project Category Badge */}
                    <div className={`absolute -top-4 left-2 sm:-left-4 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/20 bg-gradient-to-r ${project.color} bg-opacity-20`}>
                      <span className="text-white font-semibold text-sm">{project.category}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-8">
                    {/* Project Header */}
                    <div>
                      <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent tracking-tight leading-tight`}>
                        {project.title}
                      </h2>
                      <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Technologies Used */}
                    <div>
                      <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.filter(Boolean).map((tech, idx) => (
                          <div key={idx} className={`group relative overflow-hidden px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40`}
                               style={{
                                 background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                               }}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                            <span className="relative z-10">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    
                    
                    {/* Client Review */}
                    <div className="pt-4">
                      <div className={`relative overflow-hidden p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-500`}
                           style={{
                             background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                             boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                           }}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10`}></div>
                        <div className="relative z-10">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex text-yellow-400 text-xl">
                              {'★'.repeat(5)}
                            </div>
                          </div>
                          <blockquote className="text-white/90 text-lg italic mb-4 leading-relaxed">
                            &quot;{project.review}&quot;
                          </blockquote>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-white font-bold`}>
                              {project.clientName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-white font-semibold">{project.clientName}</div>
                              <div className="text-white/60 text-sm">{project.clientTitle}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-white/90">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Start Your Project?
              </span>
            </h2>
            
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Your project could be the next success story in our portfolio.
            </p>
            
            <Link 
              href="/#contact" 
              className="group inline-flex w-full md:w-auto justify-center items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 md:px-12 py-3 md:py-5 rounded-full font-bold text-base md:text-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10">Let&apos;s Collaborate</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="inline-block w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}