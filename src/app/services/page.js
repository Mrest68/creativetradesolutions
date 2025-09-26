'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
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
              
              // Add glow effect when scrolled into view
              const glowElement = entry.target.querySelector('.scroll-glow');
              if (glowElement) {
                glowElement.classList.add('glow-active');
              }
            }
          }, index * 200);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-hidden, .animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      subtitle: 'Modern & Responsive',
      description: 'Create stunning, fast, and responsive websites that captivate your audience and drive conversions.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI/UX'],
      icon: 'wordpress-react.webp',
      color: 'white',
      glowColor: 'cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'seo-optimization',
      title: 'SEO Optimization',
      subtitle: 'Rank Higher & Get Found',
      description: 'Boost your online visibility and organic traffic with our proven SEO strategies and techniques.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Analytics & Reporting'],
      icon: 'computer.webp',
      color: 'white',
      glowColor: 'emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      id: 'google-ads',
      title: 'Google/Ads',
      subtitle: 'Targeted Advertising',
      description: 'Drive qualified traffic and maximize ROI with strategically crafted Google Ads campaigns.',
      features: ['Campaign Setup', 'Keyword Optimization', 'Ad Copy Creation', 'Performance Tracking'],
      icon: 'google.png',
      color: 'white',
      glowColor: 'red-500',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10'
    },
    {
      id: 'digital-marketing',
      title: 'Social Media Management',
      subtitle: 'Complete Solutions',
      description: 'Comprehensive digital marketing strategies that combine all channels for maximum impact.',
      features: ['Multi-Channel Strategy', 'Brand Development', 'Content Marketing', 'Performance Analytics'],
      icon: 'instagram.png',
      icon2: 'facebook.png',
      color: 'white',
      glowColor: 'yellow-500',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom CSS for scroll glow effect */}
      <style jsx>{`
        .scroll-glow {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-active {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.15), 0 0 60px rgba(212, 175, 55, 0.1) !important;
          border-color: rgba(212, 175, 55, 0.3) !important;
        }
        .glow-active::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(184, 134, 11, 0.1), rgba(212, 175, 55, 0.1));
          z-index: -1;
          filter: blur(6px);
          opacity: 1;
          animation: scroll-glow-pulse 3s ease-in-out infinite alternate;
        }
        @keyframes scroll-glow-pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
      `}</style>
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => {
          // Use deterministic values based on index to prevent hydration issues
          const topPercent = ((i * 37 + 23) % 100);
          const leftPercent = ((i * 41 + 17) % 100);
          const delay = ((i * 0.3) % 3);
          const duration = (2 + ((i * 0.2) % 2));
          
          return (
            <div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30`}
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">
                Digital Excellence
              </span>
              <br />
              <span className="text-white/90">Delivered</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your digital presence with our comprehensive suite of services. 
              From stunning websites to powerful marketing campaigns, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`group relative overflow-hidden backdrop-blur-xl bg-black/90 hover:bg-black/95 transition-all duration-700 transform hover:scale-[1.01] hover:-translate-y-1 border border-white/10 hover:border-white/30 cursor-pointer shadow-2xl hover:shadow-3xl scroll-glow ${
                  index % 2 === 0 ? 'mr-0 ml-auto' : 'ml-0 mr-auto'
                } max-w-4xl`}
                     style={{
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                       background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 50%, rgba(0,0,0,0.9) 100%)`
                     }}>
                  
                  {/* Scroll Glow Background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/0 via-yellow-500/0 to-yellow-600/0 opacity-0 transition-all duration-1000 scroll-glow-bg"></div>
                  
                  {/* Modern Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700`}></div>
                  
                  {/* Elegant Glow Effect */}
                  <div className={`absolute -inset-px bg-gradient-to-br ${service.bgGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-sm`}></div>
                  
                  {/* Side Accent Line */}
                  <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 bg-gradient-to-b ${service.color} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  
                  {/* Card Content - Horizontal Layout */}
                  <div className="relative z-10 p-6 sm:p-10">
                    <div className={`flex items-center gap-10 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                      
                      {/* Service Icon Container */}
                      <div className="flex-shrink-0">
                        {service.id === 'digital-marketing' && service.icon && service.icon2 ? (
                          <div className="flex gap-6 items-center">
                            <div className="relative">
                              <Image
                                src={`/${service.icon}`}
                                alt={service.title}
                                width={128}
                                height={128}
                                className="w-20 h-20 sm:w-32 sm:h-32 object-contain filter drop-shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500"
                              />
                              <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="relative">
                              <Image
                                src={`/${service.icon2}`}
                                alt={service.title}
                                width={128}
                                height={128}
                                className="w-20 h-20 sm:w-32 sm:h-32 object-contain filter drop-shadow-2xl hover:scale-110 hover:-rotate-3 transition-all duration-500"
                              />
                              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                          </div>
                        ) : service.icon && (
                          <div className="relative">
                            <Image
                              src={`/${service.icon}`}
                              alt={service.title}
                              width={160}
                              height={160}
                              className="w-24 h-24 sm:w-40 sm:h-40 object-contain filter drop-shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500"
                            />
                            <div className={`absolute -inset-6 bg-gradient-to-br ${service.bgGradient} opacity-0 hover:opacity-30 rounded-full blur-xl transition-opacity duration-500`}></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Service Content */}
                      <div className="flex-1">
                        {/* Service Title & Subtitle */}
                        <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'} mb-6`}>
                          <h3 className="text-4xl font-bold mb-2 text-white tracking-tight group-hover:scale-105 transition-transform duration-500">
                            {service.title}
                          </h3>
                          <p className="text-white/40 font-medium uppercase tracking-widest text-sm">
                            {service.subtitle}
                          </p>
                        </div>
                        
                        {/* Description */}
                        <p className={`text-white/70 leading-relaxed mb-8 group-hover:text-white/90 transition-colors duration-500 text-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          {service.description}
                        </p>
                        
                        {/* Modern Features List */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          {service.features.map((feature, idx) => (
                            <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300 group/feature ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} shadow-lg group-hover/feature:scale-125 transition-transform duration-300`}
                                   style={{
                                     boxShadow: `0 0 8px rgba(139, 92, 246, 0.6)`
                                   }}></div>
                              <span className="text-white/70 group-hover:text-white/90 group-hover/feature:text-white transition-colors duration-300 font-medium text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    {activeService === service.id && (
                      <>
                        {[...Array(8)].map((_, i) => {
                          // Use deterministic values based on service index and particle index
                          const serviceIndex = services.findIndex(s => s.id === service.id);
                          const topPercent = (20 + ((serviceIndex * 11 + i * 19 + 7) % 60));
                          const leftPercent = (20 + ((serviceIndex * 13 + i * 23 + 11) % 60));
                          const delay = ((serviceIndex * 0.3 + i * 0.25) % 2);
                          const duration = (1 + ((serviceIndex * 0.2 + i * 0.15) % 1));
                          
                          return (
                            <div
                              key={`float-${i}`}
                              className={`absolute w-1 h-1 bg-${service.glowColor} rounded-full animate-pulse opacity-60`}
                              style={{
                                top: `${topPercent}%`,
                                left: `${leftPercent}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${duration}s`
                              }}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-white/90">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Transform Your Business?
              </span>
            </h2>
            
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Let&apos;s discuss how our services can help you achieve your digital goals and drive real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/#contact" className="group glass px-12 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Get Started Today
                </span>
                <svg className="inline-block ml-3 w-6 h-6 text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link href="/#portfolio" className="group magnetic-element bg-gradient-to-r from-cyan-500 to-purple-500 px-12 py-5 rounded-full font-bold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl relative overflow-hidden">
                <span className="relative z-10">View Our Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="inline-block ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}