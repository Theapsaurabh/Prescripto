import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-16 px-6 md:px-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 gap-10 p-8 md:p-12 max-w-6xl w-full"
      >

        {/* Animated Image Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl shadow-md"
        >
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </motion.div>

        {/* Contact Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col justify-center text-gray-700 space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-blue-700 tracking-wide">
            Get in Touch
          </h2>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="space-y-4 text-lg"
          >
            <p><span className="font-semibold text-blue-500">Address:</span><br />123 Health Street, Wellness City, India</p>
            <p><span className="font-semibold text-blue-500">Phone:</span><br />+91 73550 18077</p>
            <p><span className="font-semibold text-blue-500">Email:</span><br />ampsaurabh@gmail.com</p>
          </motion.div>

          <motion.div
            className="text-green-600 font-medium pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p>Thank you for choosing Prescript.</p>
            <p>Wishing you good health and happiness!</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;