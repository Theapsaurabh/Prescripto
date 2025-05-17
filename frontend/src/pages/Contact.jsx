import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6 md:px-20 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg grid md:grid-cols-2 gap-10 p-8 md:p-12 max-w-6xl w-full">
        
        {/* Image First */}
        <div className="overflow-hidden rounded-xl shadow-sm hover:scale-105 transition-transform duration-500">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Info Second */}
        <div className="flex flex-col justify-center text-gray-700 space-y-6">
          <h2 className="text-4xl font-bold text-blue-600">Get in Touch</h2>

          <div>
            <p><span className="font-semibold text-blue-500">Address:</span><br />123 Health Street, Wellness City, India</p>
            <p className="mt-4"><span className="font-semibold text-blue-500">Phone:</span><br />+91 73550 18077</p>
            <p className="mt-4"><span className="font-semibold text-blue-500">Email:</span><br />ampsaurabh@gmail.com</p>
          </div>

          <div className="text-green-600 font-medium mt-4">
            <p>Thank you for choosing Prescript.</p>
            <p>Wishing you good health and happiness!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;