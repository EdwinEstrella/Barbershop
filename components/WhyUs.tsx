import React from "react";
import { cn } from "../lib/utils";
import {
  ScissorsIcon,
  RazorIcon,
  ChairIcon,
  ShieldCheckIcon,
  UsersIcon,
  MessageSquareIcon,
  SparklesIcon,
  HeartIcon,
} from "./icons/Icons";

const features = [
  {
    title: "Artesanos del Estilo",
    description: "Nuestros barberos son verdaderos artistas dedicados a perfeccionar tu look con precisión y maestría.",
    icon: <ScissorsIcon />,
  },
  {
    title: "Comodidad Superior",
    description: "Relájate en un ambiente pensado para ti, donde cada detalle está diseñado para tu confort y bienestar.",
    icon: <ChairIcon />,
  },
  {
    title: "Calidad Garantizada",
    description: "Utilizamos solo los mejores productos y técnicas para asegurar un resultado impecable que supera tus expectativas.",
    icon: <ShieldCheckIcon />,
  },
  {
    title: "Ambiente Exclusivo",
    description: "Más que una barbería, somos un club para caballeros. Un espacio para desconectar, conversar y disfrutar.",
    icon: <UsersIcon />,
  },
  {
    title: "Atención Personalizada",
    description: "Nos tomamos el tiempo para entender tu estilo y tus preferencias, ofreciendo un servicio totalmente a tu medida.",
    icon: <MessageSquareIcon />,
  },
  {
    title: "Higiene Impecable",
    description: "Tu seguridad es nuestra prioridad. Mantenemos los más altos estándares de limpieza y esterilización.",
    icon: <SparklesIcon />,
  },
  {
    title: "Técnicas de Vanguardia",
    description: "Combinamos la tradición de la barbería clásica con las técnicas más modernas para un afeitado perfecto.",
    icon: <RazorIcon />,
  },
  {
    title: "Pasión por el Detalle",
    description: "Desde el primer corte hasta el último retoque, nuestra dedicación se refleja en la perfección de nuestro trabajo.",
    icon: <HeartIcon />,
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-zinc-700",
        (index === 0 || index === 4) && "lg:border-l border-zinc-700",
        index < 4 && "lg:border-b border-zinc-700"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-amber-500">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-700 group-hover/feature:bg-amber-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-zinc-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

const WhyUs: React.FC = () => {
  return (
    <section className="bg-zinc-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">¿Por Qué Elegirnos?</h2>
          <p className="text-lg text-gray-400 mt-2">La diferencia está en los detalles.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto border border-zinc-700 rounded-lg overflow-hidden">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;