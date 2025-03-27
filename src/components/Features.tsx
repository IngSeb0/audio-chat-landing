
import React from "react";
import { Mic, Headphones, Sparkles, Zap, Clock, Globe } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 h-full hover-scale">
      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Mic className="text-blue-600" size={20} />,
      title: "Reconocimiento de voz avanzado",
      description: "Comprende perfectamente cualquier acento y elimina el ruido de fondo."
    },
    {
      icon: <Headphones className="text-blue-600" size={20} />,
      title: "Respuestas naturales",
      description: "Voz sintetizada que suena completamente humana y natural."
    },
    {
      icon: <Sparkles className="text-blue-600" size={20} />,
      title: "IA contextual",
      description: "Entiende el contexto de la conversación y responde de forma relevante."
    },
    {
      icon: <Zap className="text-blue-600" size={20} />,
      title: "Respuestas instantáneas",
      description: "Procesamiento ultrarrápido para una conversación fluida sin retardos."
    },
    {
      icon: <Clock className="text-blue-600" size={20} />,
      title: "Disponible 24/7",
      description: "Siempre listo para atender a tus usuarios sin importar la hora."
    },
    {
      icon: <Globe className="text-blue-600" size={20} />,
      title: "Multilingüe",
      description: "Habla y entiende múltiples idiomas de forma nativa."
    }
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-4">
            <Sparkles size={14} className="mr-1" />
            <span>Características</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tecnología avanzada para conversaciones <span className="heading-gradient">naturales</span>
          </h2>
          <p className="text-gray-600">
            Nuestro chatbot de voz combina las últimas tecnologías para ofrecer una experiencia de conversación extraordinaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
