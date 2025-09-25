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
      color: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-900/20 to-pink-900/20",
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

  const mainPackage = {
    id: 'complete',
    name: 'Complete Digital Solution',
    price: '$399',
    priceUnit: '/month',
    originalPrice: '$799',
    description: 'Everything your business needs to dominate the digital landscape - all in one comprehensive monthly package',
    features: [
      'Unlimited website pages & features',
      'Custom web application development',
      'Advanced e-commerce functionality',
      'Professional SEO optimization',
      'Social media marketing management',
      'Google Ads campaign management',
      'Video editing & content creation',
      'Analytics & performance tracking',
      'Email marketing automation',
      'CRM & business tool integrations',
      'Mobile-first responsive design',
      'Advanced animations & interactions',
      'Multi-language support',
      'Security & performance optimization',
      'Unlimited revisions & updates',
      'Dedicated account manager',
      '24/7 priority support',
      'Monthly strategy consultations',
      'Content creation & copywriting',
      'Brand development & design'
    ],
    color: 'from-purple-400 to-pink-400',
    popular: true
  };

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

  const handleLaunchProject = () => {
    // This would integrate with Stripe checkout
    console.log('Launching project with package:', mainPackage);
    
    // Stripe checkout integration would go here
    // For now, we'll show an alert
    alert(`Launching ${mainPackage.name}! Redirecting to secure checkout...`);
    
    // In a real implementation:
    // window.location.href = `/api/checkout?package=${mainPackage.id}`;
  };



  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h1 className="text-5xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Launch Your Project
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transform your business with our proven 4-step process. From initial consultation to successful launch, 
              we guide you through every phase of your digital transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-20">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Our Proven Process
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Every successful project follows our comprehensive methodology designed to deliver exceptional results.
              </p>
            </div>
          </div>

          {/* Process Steps */}
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
                  
                  {/* Step Visual */}
                  <div className={`relative group ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className={`absolute -inset-8 bg-gradient-to-r ${step.color} rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                      
                      {/* Main Container */}
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-700"
                           style={{
                             background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)`,
                             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                           }}>
                        
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-700`}></div>
                        
                        {/* Content */}
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
                        
                        {/* Floating Elements */}
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={`step-particle-${step.id}-${i}`}
                            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30`}
                            style={{
                              top: `${10 + Math.random() * 80}%`,
                              left: `${10 + Math.random() * 80}%`,
                              animationDelay: `${Math.random() * 3}s`,
                              animationDuration: `${2 + Math.random() * 2}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-8">
                      {/* Header */}
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
                      
                      {/* Detailed Points */}
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
      </section>

      {/* Package Selection */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                All-In-One Solution
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Everything your business needs to succeed online - one comprehensive package that includes web development, marketing, SEO, and ongoing support.
              </p>
            </div>
            
            {/* Single Package Card */}
            <div className="flex justify-center">
              <div
                className="group relative p-12 rounded-3xl backdrop-blur-xl border border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transition-all duration-700 hover:scale-105 max-w-2xl w-full"
                style={{
                  background: `linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)`,
                  boxShadow: '0 25px 50px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg">
                    Complete Solution
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${mainPackage.color} rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <h3 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${mainPackage.color} bg-clip-text text-transparent`}>
                      {mainPackage.name}
                    </h3>
                    <p className="text-white/80 text-xl mb-8 leading-relaxed">
                      {mainPackage.description}
                    </p>
                    <div className="flex items-center justify-center mb-8">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-6xl font-bold text-white">{mainPackage.price}</span>
                          <span className="text-2xl text-white/70 font-medium">{mainPackage.priceUnit}</span>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-white/50 line-through text-xl">{mainPackage.originalPrice}/month</div>
                          <div className="text-green-400 text-lg font-bold bg-green-400/10 px-3 py-1 rounded-full">
                            Save 50%
                          </div>
                        </div>
                        <p className="text-white/60 text-sm mt-2">No setup fees • Cancel anytime</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {mainPackage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${mainPackage.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/90 font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Launch Button */}
                  <button
                    onClick={handleLaunchProject}
                    className="w-full px-10 py-6 rounded-2xl font-bold text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 transition-all duration-500 hover:scale-105 transform shadow-2xl hover:shadow-3xl"
                  >
                    <span className="flex items-center justify-center gap-4">
                      🚀 Launch My Project Now
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Additional Info */}
                  <div className="text-center mt-6">
                    <p className="text-white/60 text-sm">
                      🔒 Secure payment • 💬 Instant setup call • 📈 Results within 30 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="relative p-12 rounded-3xl backdrop-blur-xl border border-white/20"
                 style={{
                   background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                   boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                 }}>
              <div className="text-6xl mb-6">🛡️</div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                100% Satisfaction Guarantee
              </h3>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                We're so confident in our process and results that we offer a full satisfaction guarantee. 
                If you're not completely happy with your project, we'll work with you until you are - or provide a full refund.
              </p>
              <div className="flex items-center justify-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>30-day guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No questions asked</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Full refund available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}