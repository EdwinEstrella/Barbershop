import React from 'react';
import { NavBar } from './ui/NavBar';
import { HomeIcon, ScissorsIcon, ImageIcon, MailIcon, StarIcon, DashboardIcon, LogInIcon, LogOutIcon } from './icons/Icons';

type View = 'home' | 'login' | 'dashboard' | 'booking';

interface HeaderProps {
    isAuthenticated: boolean;
    view: View;
    setView: (view: View) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, view, setView, onLogout }) => {
    const navItems = [
        { name: 'Inicio', url: '#home', icon: HomeIcon },
        { name: 'Servicios', url: '#services', icon: ScissorsIcon },
        { name: 'Galería', url: '#gallery', icon: ImageIcon },
        { name: 'Testimonios', url: '#testimonials', icon: StarIcon },
        { name: 'Reservar', url: 'booking', icon: MailIcon }, // URL ahora es un identificador de vista
    ];

    return (
        <header>
            {(view === 'home' || view === 'booking') && <NavBar items={navItems} setView={setView} view={view} />}
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
                <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-700 backdrop-blur-lg p-1.5 rounded-full shadow-lg">
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setView('login')}
                            className="flex items-center gap-2 relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors text-zinc-400 hover:text-amber-500"
                            aria-label="Iniciar Sesión"
                        >
                            <span className="md:hidden"><LogInIcon /></span>
                            <span className="hidden md:inline">Iniciar Sesión</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setView('dashboard')}
                                className="flex items-center gap-2 relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors text-zinc-400 hover:text-amber-500 data-[active=true]:text-amber-500"
                                aria-label="Panel"
                                data-active={view === 'dashboard'}
                            >
                                <span className="md:hidden"><DashboardIcon /></span>
                                <span className="hidden md:inline">Panel</span>
                            </button>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors text-zinc-400 hover:text-amber-500"
                                aria-label="Salir"
                            >
                                <span className="md:hidden"><LogOutIcon /></span>
                                <span className="hidden md:inline">Salir</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;