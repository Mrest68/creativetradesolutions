'use client';

import { useState, useRef, useEffect } from 'react';

export default function GetStarted() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const processSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      duration: "1-2 Days",
      icon: "🤝",
      color: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      description: "We begin with a comprehensive consultation to understand your vision, goals, and requirements.",
      details: [
        "One-on-one strategy session with our senior consultant",
        "Detailed analysis of your current digital presence",
        "Competitive landscape research and positioning",
        "Goal setting and success metrics definition",
        "Timeline and milestone planning",
        "Budget optimization and resource allocation"
      ]
    },
    {
      id: 2,
      title: "Discovery & Research",
      duration: "3-5 Days",
      icon: "🔍",
      color: "from-cyan-400 to-pink-400",
      bgGradient: "from-cyan-900/20 to-pink-900/20",
      description: "Deep dive into your brand, target audience, and market to create a comprehensive project foundation.",
      details: [
        "Brand identity audit and enhancement recommendations",
        "Target audience research and persona development",
        "Content strategy and messaging framework",
        "Technical requirements and architecture planning",
        "Design system creation and style guide development",
        "Resource gathering: assets, content, and brand materials"
      ]
    },
    {
      id: 3,
      title: "Building & Customization",
      duration: "2-4 Weeks",
      icon: "⚡",
      color: "from-green-400 to-emerald-400",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      description: "Our expert team brings your vision to life with cutting-edge development and design.",
      details: [
        "Custom design creation based on your brand identity",
        "Advanced development with latest technologies",
        "Mobile-first responsive design implementation",
        "Performance optimization and speed enhancement",
        "SEO foundation setup and content optimization",
        "Regular progress updates and collaborative feedback"
      ]
    },
    {
      id: 4,
      title: "Launch & Delivery",
      duration: "2-3 Days",
      icon: "🚀",
      color: "from-yellow-600 to-yellow-500",
      bgGradient: "from-yellow-900/20 to-yellow-800/20",
      description: "Final testing, deployment, and launch with comprehensive support and training.",
      details: [
        "Comprehensive testing across all devices and browsers",
        "Final optimizations and performance tuning",
        "Domain setup and hosting configuration",
        "Analytics and tracking implementation",
        "Training session on managing your new platform",
        "30-day post-launch support and monitoring"
      ]
    }
  ];

  const servicePackages = [
    {
      id: 'starter',
      name: 'Website',
      price: '$199',
      priceUnit: '/month',
      description: 'Perfect for small businesses getting started with their digital presence',
      stripeLink: 'https://buy.stripe.com/3cI3cwg5L7iJ2fR8Zt2sM02',
      features: [
       'Website design & development with up to 5 pages',
       'Webite hosting & maintenance',
       'Website Funnel setup & optimization',
       'Business Consultation & Strategy',
      ],
      color: 'from-blue-400 to-cyan-400',
      popular: false
    },
    {
      id: 'professional',
      name: 'Full Scale Online Presence',
      price: '$399',
      priceUnit: '/month',
      description: 'Complete digital solution for growing businesses ready to dominate online',
      stripeLink: 'https://buy.stripe.com/dRm14ocTz46x9Ij3F92sM00',
      features: [
        'Website design & development with unlimited pages',
        'Social media management & content creation',
        'Google Ads & Facebook Ads management',
        'Google Business Profile optimization',

      ],
  color: 'from-cyan-400 to-pink-400',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Premium Plan',
      price: '$899',
      priceUnit: '/month',
      description: 'Enterprise-level solution with custom development and dedicated team',
      stripeLink: 'https://buy.stripe.com/cNicN62eV1YpdYz6Rl2sM01',
      features: [
        'Everything in Professional, plus:',
        'Premium SEO services with advanced strategies',
        
      ],
      color: 'from-yellow-400 to-orange-400',
      popular: false
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Space background (glow removed) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
      </div>

      {/* Hero Section */}
      {/* <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h1 className="text-5xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Launch Your Project
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform your business with our proven 4-step process. From initial consultation to successful launch, 
              we guide you through every phase of your digital transformation journey.
            </p>
          </div>
        </div>
      </section> */}

      {/* Detailed Process Steps */}
      {/* <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
        

          Process Steps
          <div className="space-y-32">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`animate-on-scroll opacity-0 transition-all duration-1000 ease-out ${
                  index % 2 === 0 ? 'translate-x-[-100px]' : 'translate-x-[100px]'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
                }`}>
                  
                  Step Visual
                  <div className={`relative group ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative">
                      Glow Effect
                      <div className={`absolute -inset-8 bg-gradient-to-r ${step.color} rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                      
                      Main Container
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-700"
                           style={{
                             background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)`,
                             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                           }}>
                        
                        Background Gradient
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-700`}></div>
                        
                        Content
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 group-hover:scale-105 transition-transform duration-700">
                          <div className="text-8xl mb-8 opacity-80 filter drop-shadow-2xl">
                            {step.icon}
                          </div>
                          <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            Step {step.id}
                          </h3>
                          <div className={`w-16 h-1 bg-gradient-to-r ${step.color} rounded-full mb-4`}></div>
                          <p className="text-white/70 text-lg font-medium">
                            {step.duration}
                          </p>
                        </div>
                        
                        Floating Elements
                        {[...Array(15)].map((_, i) => {
                          // Use deterministic values based on step and particle index to prevent hydration issues
                          const topPercent = (10 + ((step.id * 13 + i * 29 + 7) % 80));
                          const leftPercent = (10 + ((step.id * 19 + i * 31 + 11) % 80));
                          const delay = ((step.id * 0.5 + i * 0.4) % 3);
                          const duration = (2 + ((step.id * 0.3 + i * 0.25) % 2));
                          
                          return (
                            <div
                              key={`step-particle-${step.id}-${i}`}
                              className={`absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30`}
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
                    </div>
                  </div>

                  Step Content
                  <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-8">
                      Header
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} bg-opacity-20 backdrop-blur-sm border border-white/20 flex items-center justify-center`}>
                            <span className="text-2xl">{step.icon}</span>
                          </div>
                          <div>
                            <h3 className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent tracking-tight`}>
                              {step.title}
                            </h3>
                            <p className="text-white/60 text-lg font-medium">
                              {step.duration}
                            </p>
                          </div>
                        </div>
                        <p className="text-xl text-white/80 leading-relaxed mb-8">
                          {step.description}
                        </p>
                      </div>
                      
                      Detailed Points
                      <div>
                        <h4 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-6">What We Do</h4>
                        <div className="space-y-4">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className={`group relative overflow-hidden p-5 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-[1.02]`}
                                 style={{
                                   background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
                                   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                                 }}>
                              <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                              <div className="relative z-10 flex items-start gap-4">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mt-2 flex-shrink-0 shadow-lg animate-pulse`}></div>
                                <span className="text-white/90 font-medium text-lg group-hover:text-white transition-colors duration-300 leading-relaxed">
                                  {detail}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Package Selection */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
                Choose Your Service Package
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Select the perfect package for your business needs - from startup essentials to enterprise solutions.
              </p>
            </div>
            
            {/* Three Service Cards Horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch auto-rows-fr">
              {servicePackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`group relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700 hover:scale-105 flex flex-col h-full ${
                      pkg.popular 
                        ? 'border-gray-600/50' 
                        : 'border-gray-600/50'
                    }`}
                  style={{
                    background: pkg.popular 
                      
                   
                  }}
                >
                  {/* Popular Badge - Only for popular package */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-cyan-500 to-pink-500 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Glow Effect removed */}
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Card Header */}
                    <div className="text-center mb-6 pb-6 border-b border-gray-600/50">
                      <div className="mb-4">
                        <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-4`}>
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {pkg.id === 'starter' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            )}
                            {pkg.id === 'professional' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            )}
                            {pkg.id === 'enterprise' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            )}
                          </svg>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                        {pkg.name}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                    
                    {/* Pricing Section */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-4xl font-bold text-white">{pkg.price}</span>
                        <span className="text-lg text-gray-400 font-medium">{pkg.priceUnit}</span>
                      </div>
                      <div className="text-gray-500 line-through text-sm mb-2">{pkg.originalPrice}</div>
                     
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1 overflow-auto">
                      {pkg.features.slice(0, 8).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600/40 transition-all duration-300 border border-gray-600/20">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {pkg.features.length > 8 && (
                        <div className="text-center">
                          <span className="text-gray-400 text-xs">
                            +{pkg.features.length - 8} more features
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Select Button */}
                    <a
                      href={pkg.stripeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto block w-full px-6 py-4 rounded-xl font-bold text-sm transition-all duration-500 hover:scale-105 transform shadow-xl text-center ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white hover:from-gray-500 hover:to-gray-400 shadow-gray-500/25'
                          : 'bg-gradient-to-r from-gray-600 to-gray-500 text-white hover:from-gray-500 hover:to-gray-400 shadow-gray-500/25'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Choose {pkg.name.split(' ')[0]}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                    
                    {/* Additional Info - shown for all packages */}
                    <div className="text-center mt-4">
                      <p className="text-white/60 text-xs">
                         Secure payment •  setup call •  Results within 30 days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
}