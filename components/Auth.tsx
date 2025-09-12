import React, { useState } from "react";
import { LogInIcon, LockIcon, MailIcon } from "./icons/Icons";

interface AuthProps {
  onLoginSuccess: () => void;
  setView: (view: 'home') => void;
}

const API_URL = 'http://localhost:3001';

const Auth: React.FC<AuthProps> = ({ onLoginSuccess, setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
 
  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Por favor, introduce el correo y la contraseña.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Por favor, introduce una dirección de correo válida.");
      return;
    }
    
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión.');
      }

      localStorage.setItem('authToken', data.accessToken);
      onLoginSuccess();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciales inválidas o error del servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900/50 rounded-3xl shadow-2xl shadow-amber-950/20 p-8 flex flex-col items-center border border-zinc-700 text-zinc-300">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800 mb-6 shadow-lg">
          <LogInIcon />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center text-white font-serif">
          Iniciar Sesión
        </h2>
        <p className="text-zinc-400 text-sm mb-6 text-center">
          Accede al panel de control para gestionar tus citas.
        </p>
        <div className="w-full flex flex-col gap-4 mb-2">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <MailIcon />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              disabled={isSubmitting}
              className="w-full pl-12 pr-3 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white text-sm disabled:opacity-50"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <LockIcon />
            </span>
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              disabled={isSubmitting}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white text-sm disabled:opacity-50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end h-4">
          {error && (
            <div className="text-sm text-red-400 text-left">{error}</div>
          )}
          </div>
        </div>
        <button
          onClick={handleSignIn}
          disabled={isSubmitting}
          className="w-full bg-amber-500 text-zinc-900 font-bold py-3 rounded-xl shadow hover:bg-amber-600 transition mb-4 mt-2 disabled:bg-amber-800 disabled:cursor-not-allowed flex items-center justify-center h-12"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Iniciar Sesión'}
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-zinc-700"></div>
          <span className="mx-4 text-xs text-zinc-500">O</span>
          <div className="flex-grow border-t border-dashed border-zinc-700"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
         <button onClick={() => setView('home')} className="text-xs text-zinc-400 hover:underline font-medium mt-6">
              Volver al inicio
        </button>
      </div>
    </div>
  );
};
 
export default Auth;