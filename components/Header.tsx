import React from 'react';
import { NavBar } from './ui/NavBar';
import { HomeIcon, ScissorsIcon, ImageIcon, MailIcon, DashboardIcon, LogInIcon, LogOutIcon } from './icons/Icons';

type View = 'home' | 'login' | 'dashboard' | 'booking' | 'services' | 'gallery';

interface HeaderProps {
    isAuthenticated: boolean;
    view: View;
    navigate: (view: View) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, view, navigate, onLogout }) => {
    // El menú de navegación solo debe contener enlaces a páginas completas.
    const navItems = [
        { name: 'Inicio', view: 'home' as View, url: '#/home', icon: HomeIcon },
        { name: 'Servicios', view: 'services' as View, url: '#/services', icon: ScissorsIcon },
        { name: 'Galería', view: 'gallery' as View, url: '#/gallery', icon: ImageIcon },
        { name: 'Reservar', view: 'booking' as View, url: '#/booking', icon: MailIcon },
    ];

    return (
        <header>
            {['home', 'booking', 'services', 'gallery'].includes(view) && <NavBar items={navItems} view={view} navigate={navigate} />}
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
                <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-700 backdrop-blur-lg p-1.5 rounded-full shadow-lg">
                    {!isAuthenticated ? (
                        <button
                            onClick={() => navigate('login')}
                            className="flex items-center gap-2 relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors text-zinc-400 hover:text-amber-500"
                            aria-label="Iniciar Sesión"
                        >
                            <span className="md:hidden"><LogInIcon /></span>
                            <span className="hidden md:inline">Iniciar Sesión</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('dashboard')}
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