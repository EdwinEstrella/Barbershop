import React, { useState, useEffect, useCallback } from 'react';
import type { Appointment } from '../types';

const API_URL = 'http://localhost:3001';

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/api/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('No se pudieron cargar las citas. Puede que tu sesión haya expirado.');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);
  
  const handleConfirm = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Confirmada' })
      });
      fetchAppointments(); // Recargar citas
    } catch (error) {
      alert('Error al confirmar la cita.');
    }
  };

  const handleCancel = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
        try {
            const token = localStorage.getItem('authToken');
            await fetch(`${API_URL}/api/appointments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchAppointments(); // Recargar citas
        } catch (error) {
            alert('Error al cancelar la cita.');
        }
    }
  };
    
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-400 py-8">Cargando citas...</div>;
    }

    if (error) {
      return <div className="text-center text-red-400 bg-red-900/50 border border-red-500 p-4 rounded-md">{error}</div>;
    }

    if (appointments.length === 0) {
      return <p className="text-gray-400 text-center py-8">No hay citas pendientes.</p>;
    }

    return (
      <div className="space-y-4">
        {appointments.map(app => (
          <div key={app.id} className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-center gap-4 border-l-4 transition-colors ${
            app.status === 'Confirmada' ? 'bg-green-900/30 border-green-500' : 'bg-zinc-800 border-amber-500 hover:bg-zinc-700/50'
          }`}>
            <div>
              <p className="font-bold text-white">{app.client_name} - <span className="text-amber-400">{app.service}</span></p>
              <p className="text-sm text-gray-400">{new Date(app.appointment_date).toLocaleDateString()} a las {app.appointment_time}</p>
              <p className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full inline-block ${
                  app.status === 'Confirmada' ? 'bg-green-500 text-green-950' : 'bg-amber-500 text-amber-950'
              }`}>{app.status}</p>
            </div>
            <div className="flex gap-2">
              {app.status === 'Pendiente' && (
                <button onClick={() => handleConfirm(app.id)} className="bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-green-700 transition-colors">Confirmar</button>
              )}
              <button onClick={() => handleCancel(app.id)} className="bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-red-700 transition-colors">Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="dashboard" className="py-20 bg-zinc-800 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-amber-500">Panel de Control de Citas</h2>
          <p className="text-lg text-gray-400 mt-2">Gestiona tus próximas reservas.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-white mb-6">Todas las Citas</h3>
            {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;