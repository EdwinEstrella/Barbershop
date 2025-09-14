import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="pt-28 pb-20 bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">Nuestro Trabajo</h2>
          <p className="text-lg text-gray-400 mt-2">Un vistazo a nuestro arte.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img 
                src={src} 
                alt={`Imagen de la galería de la barbería ${index + 1}`} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;