import React from 'react';
import { FaBook, FaUserFriends, FaCloudDownloadAlt, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaBook className="text-3xl text-primary" />,
    title: 'All-in-One Notes',
    desc: 'Access notes, tips, and resources for all your college needs in one place.'
  },
  {
    icon: <FaUserFriends className="text-3xl text-primary" />,
    title: 'Community Driven',
    desc: 'Share and collaborate with peers to enhance your learning experience.'
  },
  {
    icon: <FaCloudDownloadAlt className="text-3xl text-primary" />,
    title: 'Easy Downloads',
    desc: 'Download materials instantly and study offline anytime.'
  },
  {
    icon: <FaLock className="text-3xl text-primary" />,
    title: 'Secure Access',
    desc: 'Your data and resources are protected with top-notch security.'
  },
];

const FeaturesSection = () => {
  return (
    <section id="why" className="py-16 bg-slate-50 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">Why Choose E-Guide?</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection; 