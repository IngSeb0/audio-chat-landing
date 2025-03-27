
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-2xl font-bold tracking-tight"
        >
          <span className="heading-gradient">VoiceChat</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Características
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cómo funciona
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Precios
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a 
            href="#demo" 
            className="glass-button px-6 py-2 text-sm font-medium"
          >
            Probar demo
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
