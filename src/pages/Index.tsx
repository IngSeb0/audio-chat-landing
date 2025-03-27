
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth reveal animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
      // Initially hide
      el.classList.add("opacity-0");
    });

    return () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How it works section */}
      <section id="how-it-works" className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cómo funciona nuestro <span className="heading-gradient">chatbot de voz</span>
            </h2>
            <p className="text-gray-600">
              Implementar nuestro chatbot de voz es sencillo y rápido, sin complicaciones técnicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center reveal-on-scroll">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Integración simple</h3>
              <p className="text-gray-600">
                Agrega nuestro chatbot a tu sitio web con solo unas líneas de código, sin configuraciones complejas.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center reveal-on-scroll">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalización</h3>
              <p className="text-gray-600">
                Adapta el chatbot a tu marca, personaliza respuestas y entrénalo con tu contenido específico.
              </p>
            </div>
            
            <div className="glass-card p-8 text-center reveal-on-scroll">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Listo para hablar</h3>
              <p className="text-gray-600">
                Tu chatbot estará listo inmediatamente para interactuar con tus usuarios con voz natural y fluida.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo section */}
      <section id="demo" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prueba nuestro <span className="heading-gradient">chatbot de voz</span>
            </h2>
            <p className="text-gray-600">
              Experimenta la potencia de nuestro chatbot de voz en tiempo real. Haz una pregunta y recibe una respuesta hablada.
            </p>
          </div>
          
          <div className="glass-card max-w-3xl mx-auto p-8 reveal-on-scroll">
            <div className="aspect-video bg-blue-50 rounded-lg flex flex-col items-center justify-center p-8">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-white"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">Presiona el micrófono y haz tu pregunta</p>
              <p className="text-xs text-gray-500 mt-2">Ejemplo: "¿Cómo puedo integrar el chatbot en mi sitio web?"</p>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-2">Historial de conversación:</h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-40 overflow-y-auto text-gray-500 italic">
                La conversación aparecerá aquí...
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Mejora la experiencia de comunicación
            </h2>
            <p className="text-blue-100 mb-8">
              Transforma la forma en que interactúas con tus usuarios a través de nuestro chatbot de voz avanzado.
            </p>
            <a 
              href="#" 
              className="glass-button bg-white hover:bg-white/90 text-blue-600 border-transparent px-8 py-3 font-medium text-center inline-block"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
