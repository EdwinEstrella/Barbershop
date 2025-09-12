
import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-zinc-900 p-8 rounded-lg text-center border border-zinc-700 hover:border-amber-500 transition-all duration-300 transform hover:-translate-y-2">
      <div className="text-amber-500 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        {service.icon}
      </div>
      <h3 className="text-2xl font-serif font-bold mb-2 text-white">{service.name}</h3>
      <p className="text-gray-400 mb-4">{service.description}</p>
      <p className="text-xl font-bold text-amber-500">{service.price}</p>
    </div>
  );
};

export default ServiceCard;
