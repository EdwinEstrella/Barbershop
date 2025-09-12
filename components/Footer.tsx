import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, MailIcon, MapPinIcon, PhoneIcon } from './icons/Icons';

const data = {
  company: {
    name: 'El Corte del Caballero',
    description: 'Construyendo experiencias de barbería premium con técnicas modernas. Ayudamos a los caballeros a encontrar su estilo y presencia.',
  },
  socialLinks: [
    { icon: FacebookIcon, label: 'Facebook', href: '#' },
    { icon: InstagramIcon, label: 'Instagram', href: '#' },
    { icon: TwitterIcon, label: 'Twitter', href: '#' },
  ],
  navLinks: [
    { text: 'Inicio', href: '#home' },
    { text: 'Servicios', href: '#services' },
    { text: 'Galería', href: '#gallery' },
    { text: 'Testimonios', href: '#testimonials' },
  ],
  serviceLinks: [
    { text: 'Corte Clásico', href: '#services' },
    { text: 'Afeitado a Navaja', href: '#services' },
    { text: 'Recorte de Barba', href: '#services' },
    { text: 'Servicio Completo', href: '#services' },
  ],
  contactInfo: [
    { icon: MailIcon, text: 'contacto@elcortedelcaballero.com', href: 'mailto:contacto@elcortedelcaballero.com' },
    { icon: PhoneIcon, text: '(123) 456-7890', href: 'tel:+1234567890' },
    { icon: MapPinIcon, text: '123 Calle Gentry, Styleburg, ST 45678', isAddress: true, href: '#' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 mt-16 w-full place-self-end">
      <div className="container mx-auto px-6 pt-16 pb-6 sm:px-6 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center sm:justify-start">
              <span className="text-2xl font-serif font-semibold text-white">
                {data.company.name}
              </span>
            </div>

            <p className="text-gray-400 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {data.socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-amber-500 transition"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Navegación</p>
              <ul className="mt-8 space-y-4 text-sm">
                {data.navLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-gray-400 hover:text-amber-500 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Servicios</p>
              <ul className="mt-8 space-y-4 text-sm">
                {data.serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-gray-400 hover:text-amber-500 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Contáctanos</p>
              <ul className="mt-8 space-y-4 text-sm">
                {data.contactInfo.map(({ icon: Icon, text, href, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-2 sm:justify-start group"
                      href={href}
                    >
                      <Icon />
                      {isAddress ? (
                        <address className="text-gray-400 group-hover:text-amber-500 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-gray-400 group-hover:text-amber-500 flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-700 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
             <p className="text-sm text-gray-400">
               Todos los derechos reservados.
            </p>
            <p className="text-gray-500 mt-4 text-sm sm:order-first sm:mt-0">
               &copy; {new Date().getFullYear()} {data.company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
