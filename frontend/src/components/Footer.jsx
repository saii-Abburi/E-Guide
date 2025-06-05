import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [feedback, setFeedback] = useState('');
  const handleFeedback = (e) => {
    e.preventDefault();
    toast.success('Successfully submitted your feedback');
    setFeedback('');
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-5 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Logo & Description */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-primary">E-Guide</span>
          </div>
          <p className="text-gray-500 max-w-xs text-sm">
            No more worries for the resources! E-Guide brings you all the notes, tips, and materials you need for college success.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-2 text-xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0A66C2] transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
              <FaTwitter />
            </a>
            <a href="mailto:support@e-guide.com"
              className="text-gray-400 hover:text-[#EA4335] transition-colors">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Center: Feedback Form */}
        <div className="flex flex-col items-center">
          <form onSubmit={handleFeedback} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Your feedback..."
              className="p-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary text-sm min-w-[180px]"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Submit
            </button>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} E-Guide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
