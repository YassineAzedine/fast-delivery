"use client";
import React, { useEffect, useRef } from 'react';

export default function AdvancedDeliveryLanding() {
  const floatingShapesRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
      
      @keyframes titleGlow {
        0% { filter: drop-shadow(0 0 20px #FFD700); }
        100% { filter: drop-shadow(0 0 40px #FFD700); }
      }
      
      @keyframes slideInRight {
        to { opacity: 1; transform: translateX(0); }
      }
      
      .float-animation { animation: float 20s infinite linear; }
      .title-glow { animation: titleGlow 3s ease-in-out infinite alternate; }
      .slide-in-right { opacity: 0; transform: translateX(50px); animation: slideInRight 0.8s forwards; }
      .slide-delay-1 { animation-delay: 0.2s; }
      .slide-delay-2 { animation-delay: 0.4s; }
      .slide-delay-3 { animation-delay: 0.6s; }
      .slide-delay-4 { animation-delay: 0.8s; }
      
      .shimmer-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
        transition: left 0.6s;
        z-index: -1;
      }
      
      .shimmer-effect:hover::before { left: 100%; }
    `;
    document.head.appendChild(style);

    const reveal = () => {
      revealRefs.current.forEach((el) => {
        if (el) {
          const windowHeight = window.innerHeight;
          const elementTop = el.getBoundingClientRect().top;
          const elementVisible = 150;
          if (elementTop < windowHeight - elementVisible) {
            el.classList.remove('opacity-0', 'translate-y-12');
            el.classList.add('opacity-100', 'translate-y-0');
          }
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal();

    const createParticle = () => {
      if (floatingShapesRef.current) {
        const particle = document.createElement('div');
        const size = Math.random() * 100 + 20;
        particle.className = 'absolute rounded-full float-animation';
        particle.style.background = `radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(0,0,0,0.1) 100%)`;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 20 + 15 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        floatingShapesRef.current.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 40000);
      }
    };

    const particleInterval = setInterval(createParticle, 3000);

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.float-animation');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(particleInterval);
      document.head.removeChild(style);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" dir="rtl">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden" ref={floatingShapesRef}></div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        <header 
          className="text-center mb-16 opacity-0 translate-y-12 transition-all duration-700 ease-out relative"
          ref={addToRefs}
        >
          <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-400 title-glow drop-shadow-2xl mb-4">
            خدمة توصيل الطلبات
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            نوفر توصيل سريع لجميع أحياء ونواحي المدينة
          </p>
          <div className="relative w-full flex justify-center mt-8">
            <img src="img.png" alt="Livreur à moto avec sac" className="w-64 md:w-96" />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <button
              onClick={() => window.location.href = '/restaurants'}
              className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-black to-yellow-500 text-white shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 hover:-translate-y-1 transition-all duration-300 shimmer-effect relative overflow-hidden z-10"
            >
              <i className="fas fa-store ml-2 text-white"></i>
              Voir les restaurants
            </button>
            <button 
              className="px-8 py-4 rounded-full font-semibold text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 shimmer-effect relative overflow-hidden z-10"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <i className="fas fa-phone ml-2"></i>
              Contact
            </button>
          </div>
        </header>

        {/* Features Section */}
        <section className="mt-24 max-w-6xl w-full opacity-0 translate-y-12 transition-all duration-700 ease-out" ref={addToRefs}>
          <h2 className="text-4xl font-bold text-white text-center mb-12 relative">
            مميزات خدمتنا
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-yellow-500 to-white rounded-full"></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: 'fas fa-rocket', title: 'توصيل سريع', desc: 'نوصل طلبك في أسرع وقت ممكن لجميع أحياء المدينة.' },
              { icon: 'fas fa-user-shield', title: 'سائقون موثوقون', desc: 'جميع السائقين موثقين ومؤهلين لتوصيل طلبك بأمان.' },
              { icon: 'fas fa-map-marker-alt', title: 'تتبع مباشر', desc: 'تابع طلبك خطوة بخطوة عبر التطبيق.' },
              { icon: 'fas fa-mobile-alt', title: 'سهولة الاستخدام', desc: 'واجهة بسيطة وسهلة لتقديم طلبك دون أي تعقيد.' }
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 text-center transition-all duration-500 hover:-translate-y-3 hover:rotate-y-1 hover:shadow-2xl hover:shadow-yellow-400/20 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <i className={`${feature.icon} text-6xl text-yellow-400 mb-6 block transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:text-white relative z-10`}></i>
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other sections remain similar with black/yellow/white styling */}
      </div>

      <footer className="mt-16 text-center text-white/60 text-lg p-8">
        <p>&copy; 2025 جميع الحقوق محفوظة.</p>
      </footer>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    </div>
  );
}
