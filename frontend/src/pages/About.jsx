import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="px-4 md:px-20 py-12 text-gray-800 bg-gray-100 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          ABOUT <span className="text-blue-600">US</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-500">
        <div className="flex flex-col md:flex-row h-full">
          {/* Full-height image */}
          <div className="md:w-1/2">
            <img
              src={assets.about_image}
              alt="About Prescript"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:w-1/2 text-justify space-y-5 flex flex-col justify-center">
            <p className="text-lg">
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
            <p className="font-semibold text-blue-600">
              Your Health. Your Schedule. One Click Away.
              <br />
              Book smarter. Live healthier — with Prescript.
            </p>

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
      </div>
      {/* WHY CHOOSE US */}
<div className="mt-20">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Box 1: Efficiency */}
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
     
      <h3 className="text-xl font-semibold mb-2 text-blue-600">Efficiency</h3>
      <p className="text-sm text-gray-700">
        Save time with our streamlined appointment system. Find doctors, view availability, and book in seconds.
      </p>
    </div>

    {/* Box 2: Convenience */}
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
      
      <h3 className="text-xl font-semibold mb-2 text-blue-600">Convenience</h3>
      <p className="text-sm text-gray-700">
        Access care from anywhere at any time. Our platform works around your schedule — not the other way around.
      </p>
    </div>

    {/* Box 3: Personalization */}
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
      
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