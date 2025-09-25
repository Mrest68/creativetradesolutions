'use client';

import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState(null);

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
          }, index * 100);
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
  icon: '',
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
  icon: '',
      color: 'white',
      glowColor: 'emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      id: 'social-media',
      title: 'Social Media Marketing',
      subtitle: 'Facebook & Instagram',
      description: 'Build your brand presence and engage with your audience across all major social platforms.',
      features: ['Content Strategy', 'Community Management', 'Brand Awareness', 'Engagement Growth'],
  icon: '',
      color: 'white',
      glowColor: 'purple-500',
      bgGradient: 'from-pink-500/10 to-purple-500/10'
    },
    {
      id: 'google-ads',
      title: 'Google Ads',
      subtitle: 'Targeted Advertising',
      description: 'Drive qualified traffic and maximize ROI with strategically crafted Google Ads campaigns.',
      features: ['Campaign Setup', 'Keyword Optimization', 'Ad Copy Creation', 'Performance Tracking'],
  icon: '',
      color: 'white',
      glowColor: 'red-500',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10'
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      subtitle: 'Professional Quality',
      description: 'Transform your raw footage into compelling stories with professional video editing services.',
      features: ['Color Correction', 'Motion Graphics', 'Audio Enhancement', 'Brand Integration'],
  icon: '',
      color: 'white',
      glowColor: 'indigo-500',
      bgGradient: 'from-purple-500/10 to-indigo-500/10'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      subtitle: 'Complete Solutions',
      description: 'Comprehensive digital marketing strategies that combine all channels for maximum impact.',
      features: ['Multi-Channel Strategy', 'Brand Development', 'Content Marketing', 'Performance Analytics'],
  icon: '',
      color: 'white',
      glowColor: 'yellow-500',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
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
              From stunning websites to powerful marketing campaigns, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 hover:from-white/10 hover:via-white/15 hover:to-white/10 rounded-2xl transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 border border-white/20 hover:border-white/40 h-full cursor-pointer shadow-2xl hover:shadow-3xl`}
                     style={{
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                       background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)`
                     }}>
                  
                  {/* Modern Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-700 rounded-2xl`}></div>
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8">
                  
                  {/* Service Icon Container */}
                  <div className="flex justify-center mb-8">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.bgGradient} flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-110`}
                         style={{
                           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                         }}>
                      <span className="text-4xl filter drop-shadow-lg">
                        {service.icon}
                      </span>
                    </div>
                  </div>
                  
                    {/* Service Title & Subtitle */}
                    <div className="text-center mb-6">
                      <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent tracking-tight`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/50 font-medium uppercase tracking-wider">
                        {service.subtitle}
                      </p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/70 leading-relaxed mb-8 group-hover:text-white/90 transition-colors duration-500 text-center">
                      {service.description}
                    </p>
                    
                    {/* Modern Features List */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} shadow-lg`}
                               style={{
                                 boxShadow: `0 0 8px rgba(139, 92, 246, 0.4)`
                               }}></div>
                          <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Modern CTA Button */}
                    <button className={`w-full relative overflow-hidden px-6 py-4 rounded-xl font-semibold transition-all duration-500 group-hover:scale-[1.02] border border-white/20 hover:border-white/40`}
                            style={{
                              background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 hover:opacity-20 transition-opacity duration-300`}></div>
                      <span className={`relative z-10 bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-bold`}>
                        Learn More
                      </span>
                    </button>
                    
                    {/* Floating Elements */}
                    {activeService === service.id && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`float-${i}`}
                            className={`absolute w-1 h-1 bg-${service.glowColor} rounded-full animate-pulse opacity-60`}
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: `${1 + Math.random()}s`
                            }}
                          />
                        ))}
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
              Let's discuss how our services can help you achieve your digital goals and drive real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/#contact" 
                className="group glass px-12 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Get Started Today
                </span>
                <svg className="inline-block ml-3 w-6 h-6 text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="/#portfolio" 
                className="group magnetic-element bg-gradient-to-r from-cyan-500 to-purple-500 px-12 py-5 rounded-full font-bold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">View Our Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="inline-block ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}