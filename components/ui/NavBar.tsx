import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type View = 'home' | 'login' | 'dashboard' | 'booking' | 'services' | 'gallery';

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
  view: View;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  view: View;
  navigate: (view: View) => void;
}

export function NavBar({ items, className, view, navigate }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const activeItem = items.find(item => item.view === view);
    
    if (activeItem) {
      setActiveTab(activeItem.name);
    } else {
      setActiveTab(''); 
    }
  }, [items, view]);


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
              onClick={(e) => {
                e.preventDefault();
                navigate(item.view);
              }}
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