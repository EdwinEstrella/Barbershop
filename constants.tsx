import React from 'react';
import type { Service } from './types';
import { ScissorsIcon, RazorIcon, BeardIcon, BrushIcon } from './components/icons/Icons';

export const SERVICES_DATA: Service[] = [
  {
    icon: <ScissorsIcon />,
    name: "Corte Clásico",
    description: "Un corte atemporal adaptado a tu estilo, finalizado con un afeitado de cuello a navaja y toalla caliente.",
    price: "$40"
  },
  {
    icon: <RazorIcon />,
    name: "Afeitado a Navaja",
    description: "La experiencia de afeitado definitiva con toallas calientes, espuma rica y un acabado suave como el cristal.",
    price: "$45"
  },
  {
    icon: <BeardIcon />,
    name: "Recorte y Perfilado de Barba",
    description: "Perfilado, recorte y acondicionamiento experto para que tu barba luzca en su mejor momento.",
    price: "$25"
  },
  {
    icon: <BrushIcon />,
    name: "El Servicio Completo",
    description: "El paquete completo para el caballero. Incluye un corte de pelo clásico y un afeitado a navaja.",
    price: "$75"
  }
];

export const GALLERY_IMAGES: string[] = [
  "https://picsum.photos/id/102/800/600",
  "https://picsum.photos/id/212/800/600",
  "https://picsum.photos/id/326/800/600",
  "https://picsum.photos/id/367/800/600",
  "https://picsum.photos/id/103/800/600",
  "https://picsum.photos/id/40/800/600",
];