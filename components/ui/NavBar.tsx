import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type View = 'home' | 'login' | 'dashboard' | 'booking';

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  setView: (view: View) => void;
  view: View;
}

export function NavBar({ items, className, setView, view }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    // Si estamos en la página de inicio, escuchamos los eventos de scroll para actualizar la pestaña activa
    if (view === 'home') {
      const handleScroll = () => {
        let currentSectionId = '';
        const headerOffset = 150; 
        
        const sections = items
          .filter(item => item.url.startsWith("#"))
          .map(item => document.getElementById(item.url.substring(1)))
          .filter(Boolean) as HTMLElement[];

        for (const section of sections) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - headerOffset) {
            currentSectionId = section.getAttribute('id') || '';
          }
        }
        
        const activeItem = items.find(item => item.url === `#${currentSectionId}`);
        if(activeItem) {
            setActiveTab(activeItem.name);
        } else if (window.scrollY < 200) {
            setActiveTab(items[0].name);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); 

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Para otras vistas como 'booking', establecemos la pestaña activa según la vista
      const activeItem = items.find(item => item.url === view);
      if (activeItem) {
        setActiveTab(activeItem.name);
      } else {
        setActiveTab(''); 
      }
    }
  }, [items, view]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    // Para navegación tipo página (ej. 'booking')
    if (!item.url.startsWith("#")) {
      setView(item.url as View);
      return;
    }

    // Para navegación con enlaces de ancla
    if (view !== 'home') {
      // Si no estamos en la página de inicio, cambiamos a ella y luego hacemos scroll
      setView('home');
      // Usamos un pequeño retraso para permitir que los componentes de la página de inicio se rendericen antes de hacer scroll
      setTimeout(() => {
        document.querySelector(item.url)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Si ya estamos en la página de inicio, solo hacemos scroll
      document.querySelector(item.url)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mt-6",
        className
      )}
    >
      <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-700 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                isActive ? "text-amber-500" : "text-zinc-400 hover:text-amber-500"
              )}
              aria-label={item.name}
            >
              <span className="hidden md:inline">{item.name}</span>
              <div className="md:hidden">
                <Icon />
              </div>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-amber-500/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-500 rounded-t-full">
                    <div className="absolute w-10 h-5 bg-amber-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-5 bg-amber-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-amber-500/20 rounded-full blur-sm top-0 left-[0.4rem]" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}