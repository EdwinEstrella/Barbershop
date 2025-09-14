import React from 'react';
import type { Service } from '../types';
import { SERVICES_DATA } from '../constants';
import ServiceCard from './ServiceCard';

const Services: React.FC = () => {
  return (
    <section id="services" className="pt-28 pb-20 bg-zinc-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">Nuestros Servicios</h2>
          <p className="text-lg text-gray-400 mt-2">Hechos con precisión y cuidado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;