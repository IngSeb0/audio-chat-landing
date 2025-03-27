
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold">
              <span className="heading-gradient">VoiceChat</span>
            </h3>
            <p className="text-gray-600 max-w-xs">
              La nueva generación de chatbots de voz para una comunicación más humana y efectiva.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Características</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Cómo funciona</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Precios</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} VoiceChat. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Términos
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
