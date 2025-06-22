import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-16 px-6 md:px-20 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 gap-10 p-8 md:p-12 max-w-6xl w-full 
                      animate-fade-in-up transition-all duration-700 ease-out">
        
        {/* Image Section */}
        <div className="overflow-hidden rounded-2xl shadow-md transform hover:scale-105 transition duration-500">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center text-gray-700 space-y-6 animate-slide-in-right transition duration-700 ease-out">
          <h2 className="text-4xl font-extrabold text-blue-700 tracking-wide">
            Get in Touch
          </h2>

          <div className="space-y-4 text-lg transform hover:scale-102 transition duration-300">
            <p>
              <span className="font-semibold text-blue-500">Address:</span><br />
              123 Health Street, Wellness City, India
            </p>
            <p>
              <span className="font-semibold text-blue-500">Phone:</span><br />
              +91 73550 18077
            </p>
            <p>
              <span className="font-semibold text-blue-500">Email:</span><br />
              ampsaurabh@gmail.com
            </p>
          </div>

          <div className="text-green-600 font-medium pt-4 animate-fade-in transition duration-1000 ease-in">
            <p>Thank you for choosing Prescript.</p>
            <p>Wishing you good health and happiness!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
