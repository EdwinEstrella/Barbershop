import React from "react";
import { cn } from "../lib/utils";
import { ChevronRightIcon } from "./icons/Icons";

type View = 'home' | 'login' | 'dashboard' | 'booking' | 'services' | 'gallery';

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  navigate: (view: View) => void;
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  darkLineColor = "#1f1f22", // zinc-800
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent to-90%" />
    </div>
  )
}

const Hero: React.FC<HeroSectionProps> = ({ className, navigate, gridOptions, ...props }) => {
    return (
      <div className={cn("relative", className)} {...props}>
        <div className="absolute top-0 z-[0] h-screen w-screen bg-amber-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(217,119,6,0.2),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-4xl leading-0 lg:leading-5 mx-auto text-center">
              <h1 className="text-sm text-zinc-400 group font-sans mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-zinc-400/5 to-transparent border border-white/10 rounded-3xl w-fit">
                El Corte del Caballero
                <ChevronRightIcon className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              <h2 className="text-4xl tracking-tighter font-serif bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                Artesanía en Cada Corte, 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Estilo en Cada Detalle.
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-300">
                Experimenta la tradición y la precisión en nuestra barbería. Ofrecemos un servicio de primera para el caballero moderno.
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fcd34d_0%,#b45309_50%,#fcd34d_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 text-xs font-medium backdrop-blur-3xl">
                    <button
                      onClick={() => navigate('booking')}
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/5 via-amber-400/10 to-transparent text-white border-zinc-700 border hover:bg-gradient-to-tr hover:from-zinc-300/10 hover:via-amber-400/20 transition-all sm:w-auto py-4 px-10"
                    >
                      Reservar Cita
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default Hero;