
import React, { useEffect, useState } from "react";
import { Mic, Volume2, Sparkles } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const animationInterval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Animated circles */}
      <div className="absolute -z-10 w-full h-full">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-100/40 filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-100/30 filter blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div 
          className={`space-y-8 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium space-x-1">
            <Sparkles size={14} />
            <span>La nueva forma de comunicación</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Chatbot de voz <br />
            <span className="heading-gradient">inteligente y natural</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg">
            Comunícate con tu audiencia de forma más humana y efectiva. Nuestro chatbot de voz utiliza tecnología de punta para crear conversaciones fluidas y naturales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#demo" 
              className="glass-button bg-blue-600 hover:bg-blue-700 text-white border-blue-500 px-8 py-3 font-medium text-center"
            >
              Probar ahora
            </a>
            <a 
              href="#how-it-works" 
              className="glass-button px-8 py-3 font-medium text-center"
            >
              Cómo funciona
            </a>
          </div>
        </div>
        
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="glass-card aspect-square max-w-md mx-auto overflow-hidden p-8 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-8">
              <div className={`absolute inset-0 rounded-full bg-blue-500/10 transition-transform duration-700 ease-in-out ${isAnimating ? 'scale-90 opacity-70' : 'scale-100 opacity-0'}`} />
              <div className={`absolute inset-0 rounded-full bg-blue-500/5 transition-transform duration-700 ease-in-out delay-100 ${isAnimating ? 'scale-105 opacity-70' : 'scale-100 opacity-0'}`} />
              {isAnimating ? (
                <Volume2 size={64} className="text-blue-600 animate-pulse-slow" />
              ) : (
                <Mic size={64} className="text-blue-600" />
              )}
            </div>
            <div className="space-y-1 text-center">
              <p className="font-medium text-gray-900">{isAnimating ? "Escuchando respuesta..." : "Presiona para hablar"}</p>
              <p className="text-sm text-gray-500">Prueba nuestro chatbot de voz en vivo</p>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-black/5 blur-xl rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
