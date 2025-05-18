import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="px-4 md:px-20 py-12 text-gray-800 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold">
          ABOUT <span className="text-blue-600">US</span>
        </h2>
      </motion.div>

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="md:w-1/2"
          >
            <img
              src={assets.about_image}
              alt="About Prescript"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Section */}
          <div className="p-8 md:w-1/2 text-justify space-y-5 flex flex-col justify-center">
            <p className="text-lg leading-relaxed">
              <strong>Prescript</strong> is your trusted platform for booking doctor appointments with ease, speed, and confidence. Whether you're seeking a general physician or a specialist, we connect you with verified, experienced healthcare professionals ready to help you feel your best.
            </p>

            <p>
              At Prescript, we value your time and health. That’s why we’ve built a smart, intuitive system that allows patients to:
              <ul className="list-disc list-inside mt-2 pl-2 text-sm text-gray-600">
                <li>Find top-rated doctors by speciality and availability</li>
                <li>Book appointments online instantly</li>
                <li>Access verified reviews and doctor profiles</li>
                <li>Get personalized healthcare recommendations</li>
              </ul>
            </p>

            <motion.p
              className="font-semibold text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Health. Your Schedule. One Click Away.
              <br />
              Book smarter. Live healthier — with Prescript.
            </motion.p>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Our Vision</h3>
              <p>
                At Prescript, our vision is to revolutionize the way people access healthcare by making doctor appointments simple, fast, and reliable for everyone, everywhere.
              </p>
              <p>
                We aim to build a future where quality healthcare is just a click away — empowering individuals to take control of their health through technology, transparency, and trust.
              </p>
              <p>
                Our goal is to become the most trusted digital healthcare companion, bridging the gap between patients and doctors with efficiency, empathy, and innovation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Efficiency */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Efficiency</h3>
            <p className="text-sm text-gray-700">
              Save time with our streamlined appointment system. Find doctors, view availability, and book in seconds.
            </p>
          </motion.div>

          {/* Convenience */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Convenience</h3>
            <p className="text-sm text-gray-700">
              Access care from anywhere at any time. Our platform works around your schedule — not the other way around.
            </p>
          </motion.div>

          {/* Personalization */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Personalization</h3>
            <p className="text-sm text-gray-700">
              Receive smart doctor recommendations and appointment reminders tailored to your health needs.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;