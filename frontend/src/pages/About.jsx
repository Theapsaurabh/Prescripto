import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="px-4 md:px-20 py-12 text-gray-800 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      {/* Title */}
      <div className="text-center mb-10 transition-all duration-500">
        <h2 className="text-4xl font-bold uppercase tracking-wide">
          About <span className="text-blue-600">Us</span>
        </h2>
      </div>

      {/* About Content Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transform transition duration-500">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={assets.about_image}
              alt="About Us"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
            />
          </div>

          {/* Text Section */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-5 text-justify">
            <p className="text-lg leading-relaxed">
              <strong>Prescript</strong> is your trusted platform for booking doctor appointments with ease, speed, and confidence. Whether you're seeking a general physician or a specialist, we connect you with verified, experienced healthcare professionals ready to help you feel your best.
            </p>

            <div>
              <p className="mb-2">
                At Prescript, we value your time and health. That’s why we’ve built a smart, intuitive system that allows patients to:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm pl-4 space-y-1">
                <li>Find top-rated doctors by speciality and availability</li>
                <li>Book appointments online instantly</li>
                <li>Access verified reviews and doctor profiles</li>
                <li>Get personalized healthcare recommendations</li>
              </ul>
            </div>

            <p className="font-semibold text-blue-600 text-center mt-4">
              Your Health. Your Schedule. One Click Away.
              <br />
              Book smarter. Live healthier — with Prescript.
            </p>

            <div className="mt-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
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
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Efficiency</h3>
            <p className="text-sm text-gray-700">
              Save time with our streamlined appointment system. Find doctors, view availability, and book in seconds.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Convenience</h3>
            <p className="text-sm text-gray-700">
              Access care from anywhere at any time. Our platform works around your schedule — not the other way around.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Personalization</h3>
            <p className="text-sm text-gray-700">
              Receive smart doctor recommendations and appointment reminders tailored to your health needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
