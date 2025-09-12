
import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-zinc-900 p-8 rounded-lg flex flex-col items-center text-center border border-zinc-700">
      {/* FIX: Use 'testimonial.image' instead of 'testimonial.avatarUrl' to match the Testimonial type. */}
      <img 
        src={testimonial.image} 
        alt={testimonial.name} 
        className="w-20 h-20 rounded-full mb-4 border-2 border-amber-500"
      />
      {/* FIX: Use 'testimonial.text' instead of 'testimonial.quote' to match the Testimonial type. */}
      <p className="text-gray-300 italic mb-4 flex-grow">"{testimonial.text}"</p>
      <h4 className="font-bold text-amber-500 tracking-wider">- {testimonial.name}</h4>
    </div>
  );
};

export default TestimonialCard;
