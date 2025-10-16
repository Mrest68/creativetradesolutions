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
    <main className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#353535'}}>
      {/* Space background (glow removed) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{backgroundColor: '#353535'}}></div>
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
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
                Flexible Pricing Built For Your Needs
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Select the perfect package for your business needs - from startup essentials to enterprise solutions.
              </p>
            </div>
            
            {/* Three Service Cards Horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[2000px] mx-auto items-stretch">
              {servicePackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`group relative transition-all duration-700 flex flex-col bg-white overflow-hidden ${
                      pkg.popular 
                        ? 'border-gray-200 shadow-2xl' 
                        : 'border-gray-200 shadow-lg'
                    }`}
                >
                  {/* Thin Banner at Top */}
                  <div className="py-5 px-10 text-center" style={{backgroundColor: '#FF5760'}}>
                    <h3 className="text-2xl font-semibold text-white">
                      {pkg.name}
                    </h3>
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col flex-1 p-10">
                    {/* Pricing Section */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-6xl font-bold text-black">{pkg.price}</span>
                        <span className="text-2xl text-gray-600 font-medium">{pkg.priceUnit}</span>
                      </div>
                      <div className="text-gray-500 line-through text-base mb-2">{pkg.originalPrice}</div>
                     
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1">
                      {pkg.features.slice(0, 8).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="#FFD700" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {pkg.features.length > 8 && (
                        <div className="text-center">
                          <span className="text-gray-500 text-xs">
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
                      className="mt-auto block w-full px-6 py-4 font-bold text-base transition-all duration-500 hover:scale-105 transform shadow-lg text-center text-white hover:opacity-90"
                      style={{backgroundColor: '#FF5760'}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Choose {pkg.name.split(' ')[0]}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                    
                   
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          
        </div>
        
      </section>

      {/* Reviews Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              What Our Clients Say
            </h2>
            <p className="text-xl text-white/70">
              Don't just take our word for it - hear from businesses we've helped grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Rodriguez",
                company: "Novus Home Remodeling",
                rating: 5,
                text: "Creative Trade Solutions transformed our online presence completely. Our website looks professional and we're getting quality leads every week. Best investment we've made for our business!"
              },
              {
                name: "Maria Garcia",
                company: "Lalo's Carpentry",
                rating: 5,
                text: "The team at Creative Trade Solutions really understood our vision. They delivered a beautiful website and their social media management has brought us so many new customers. Highly recommend!"
              },
              {
                name: "David Thompson",
                company: "Storm Pros Florida",
                rating: 5,
                text: "Working with Creative Trade Solutions has been amazing. They handle everything from our website to Google Ads, and the results speak for themselves. Our business has grown 3x since we started!"
              },
              {
                name: "Jennifer Martinez",
                company: "Camino Concepts",
                rating: 5,
                text: "Professional, responsive, and results-driven. Creative Trade Solutions took our business to the next level with their comprehensive digital marketing services. Worth every penny!"
              },
              {
                name: "Michael Chen",
                company: "Urban Construction",
                rating: 5,
                text: "The best decision we made was partnering with Creative Trade Solutions. Their expertise in digital marketing and web design has helped us dominate our local market. Fantastic team!"
              },
              {
                name: "Sarah Williams",
                company: "Elite Plumbing Services",
                rating: 5,
                text: "Creative Trade Solutions exceeded all our expectations. From website design to ongoing support, they've been incredible partners in growing our business. Couldn't be happier!"
              }
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.company}</p>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </main>
  );
}