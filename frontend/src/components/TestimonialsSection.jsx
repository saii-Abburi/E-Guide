import React from 'react';

const testimonials = [
  {
    name: 'Aarav S.',
    text: 'E-Guide made my exam prep so much easier. All the notes I needed were just a click away!',
    role: 'Engineering Student'
  },
  {
    name: 'Priya K.',
    text: 'The community feature is amazing! I could share and get tips from seniors.',
    role: 'Medical Student'
  },
  {
    name: 'Rahul D.',
    text: 'I love the clean interface and how fast I can find what I need. Highly recommended!',
    role: 'Commerce Student'
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className="bg-slate-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center animate-fade-in"
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            <p className="text-gray-700 italic mb-4">"{t.text}"</p>
            <div className="font-semibold text-primary">{t.name}</div>
            <div className="text-sm text-gray-500">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection; 