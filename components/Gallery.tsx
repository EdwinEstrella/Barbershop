import React from 'react';

const Gallery: React.FC = () => {
  const galleryImages = [
    "/images/fade.jpeg",
    "/images/face2.jpeg",
    "/images/fade3.jpeg",
    "/images/fade4.jpeg",
    "/images/fade5.jpeg",
    "/images/fade6.jpeg",
  ];

  return (
    <section id="gallery" className="pt-28 pb-20 bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">Nuestro Trabajo</h2>
          <p className="text-lg text-gray-400 mt-2">Un vistazo a nuestro arte.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500">
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