
export interface Service {
  icon: React.ReactNode;
  name: string;
  description: string;
  price: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

// FIX: Added Testimonial interface to resolve import error.
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}
