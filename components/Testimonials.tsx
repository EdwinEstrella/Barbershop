import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from './ui/TestimonialsColumn';

const testimonials = [
  {
    text: "El mejor corte de pelo que he tenido. La atención al detalle es inigualable. Salí sintiéndome como un hombre nuevo.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Juan Pérez",
    role: "Cliente Frecuente",
  },
  {
    text: "La implementación fue fluida y rápida. La interfaz personalizable y fácil de usar facilitó la capacitación del equipo.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Carlos Gómez",
    role: "Cliente Nuevo",
  },
  {
    text: "El ambiente es increíble: clásico, genial y cómodo. Los barberos son verdaderos artistas.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Miguel Rodríguez",
    role: "Visitante",
  },
  {
    text: "La integración perfecta de este sistema mejoró nuestras operaciones y eficiencia. Muy recomendable por su interfaz intuitiva.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Javier Fernández",
    role: "Cliente Frecuente",
  },
  {
    text: "Sus sólidas características y rápido soporte han transformado nuestro flujo de trabajo, haciéndonos significativamente más eficientes.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Lucía Martínez",
    role: "Cliente Frecuente",
  },
  {
    text: "Vengo aquí por el afeitado a navaja. Es una experiencia relajante con un resultado impecablemente suave.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "David Sánchez",
    role: "Cliente Fiel",
  },
  {
    text: "Nuestras funciones comerciales mejoraron con un diseño fácil de usar y comentarios positivos de los clientes.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Daniel Ramírez",
    role: "Visitante",
  },
  {
    text: "Entregaron una solución que superó las expectativas, comprendiendo nuestras necesidades y mejorando nuestras operaciones.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Isabel Torres",
    role: "Cliente Nuevo",
  },
  {
    text: "Con este sistema, nuestra presencia en línea y las conversiones mejoraron significativamente, impulsando el rendimiento del negocio.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Miguel Vargas",
    role: "Cliente Frecuente",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-zinc-800 relative">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-serif text-amber-500">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-gray-400 mt-2">Su satisfacción es nuestro mayor halago.</p>
        </motion.div>

        <div className="relative flex justify-center gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" duration={30} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" duration={22} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;