import React, { useState } from 'react';
import { SERVICES_DATA } from '../constants';

const API_URL = 'http://localhost:3001';

const BookingForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Hubo un problema al enviar tu solicitud.');
      }
      
      setSubmitted(true);
      event.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="bg-zinc-800 p-8 rounded-lg border border-amber-500 text-center transition-all duration-500">
        <h3 className="text-2xl font-serif font-bold mb-4 text-white">¡Gracias!</h3>
        <p className="text-gray-300">
          Tu solicitud de cita ha sido enviada. Nos pondremos en contacto contigo pronto para confirmar.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 space-y-6"
    >
      {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
        <input type="text" id="name" name="name" required disabled={isSubmitting} className="w-full bg-zinc-900 border border-zinc-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
        <input type="tel" id="phone" name="phone" required disabled={isSubmitting} className="w-full bg-zinc-900 border border-zinc-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50" />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">Servicio</label>
        <select id="service" name="service" required disabled={isSubmitting} className="w-full bg-zinc-900 border border-zinc-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50">
          <option value="">Selecciona un servicio</option>
          {SERVICES_DATA.map(service => (
            <option key={service.name} value={service.name}>{service.name} - {service.price}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
          <input type="date" id="date" name="date" min={today} required disabled={isSubmitting} className="w-full bg-zinc-900 border border-zinc-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50" />
        </div>
        <div className="w-1/2">
          <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">Hora</label>
          <input type="time" id="time" name="time" min="09:00" max="19:00" required disabled={isSubmitting} className="w-full bg-zinc-900 border border-zinc-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50" />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 text-zinc-900 font-bold py-3 px-10 text-lg rounded-sm hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 disabled:bg-amber-800 disabled:cursor-not-allowed disabled:scale-100 flex justify-center items-center h-12">
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : 'Solicitar Cita'}
      </button>
    </form>
  );
};

export default BookingForm;