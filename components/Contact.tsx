import React from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon } from './icons/Icons';
import BookingForm from './BookingForm';

type View = 'home' | 'login' | 'dashboard' | 'booking' | 'services' | 'gallery';

interface BookingProps {
  navigate: (view: View) => void;
}

const Booking: React.FC<BookingProps> = ({ navigate }) => {
  return (
    <section id="booking" className="py-20 pt-28 bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">Reserva tu Cita</h2>
          <p className="text-lg text-gray-400 mt-2">Asegura tu lugar en la silla del barbero.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 w-full text-lg">
            <h3 className="text-3xl font-serif text-white mb-6">Información de Contacto</h3>
            <p className="text-gray-400 mb-8">
              Puedes reservar directamente usando el formulario o contactarnos si tienes alguna pregunta. Atendemos sin cita, pero se recomienda reservar.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPinIcon />
                <span className="text-gray-300">123 Calle Gentry, Styleburg, ST 45678</span>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon />
                <span className="text-gray-300">(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-4">
                <ClockIcon />
                <div className="text-gray-300">
                  <p>Mar - Vie: 9am - 7pm</p>
                  <p>Sáb: 8am - 5pm</p>
                  <p>Dom - Lun: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <BookingForm />
          </div>
        </div>
        <button onClick={() => navigate('home')} className="text-xs text-zinc-400 hover:underline font-medium mt-12 block mx-auto">
          Volver al inicio
        </button>
      </div>
    </section>
  );
};

export default Booking;