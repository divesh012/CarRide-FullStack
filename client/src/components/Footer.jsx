import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'   // ✅ FIXED (recommended correct library)

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-40 text-sm text-gray-500 bg-white"
    >
      {/* TOP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-10 pb-10 border-b border-gray-300"
      >
        {/* LEFT - BRAND */}
        <div className="max-w-sm">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-10"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 leading-6 text-gray-500"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mt-6"
          >
            <a href="#"><img src={assets.facebook_logo} className="w-5 h-5 hover:scale-110 transition" /></a>
            <a href="#"><img src={assets.twitter_logo} className="w-5 h-5 hover:scale-110 transition" /></a>
            <a href="#"><img src={assets.instagram_logo} className="w-5 h-5 hover:scale-110 transition" /></a>
            <a href="#"><img src={assets.gmail_logo} className="w-5 h-5 hover:scale-110 transition" /></a>
          </motion.div>
        </div>

        {/* RIGHT - LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-1/2"
        >
          {/* Quick Links */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 uppercase tracking-wide">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-black transition-all">Home</a></li>
              <li><a href="#" className="hover:text-black transition-all">Browse Car</a></li>
              <li><a href="#" className="hover:text-black transition-all">List Your Car</a></li>
              <li><a href="#" className="hover:text-black transition-all">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 uppercase tracking-wide">
              Resources
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-black transition-all">Help Center</a></li>
              <li><a href="#" className="hover:text-black transition-all">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-all">Insurance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-semibold text-gray-800 uppercase tracking-wide">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 94107</li>
              <li>+91 9112879562</li>
              <li>diveshkuthe8556@gmail.com</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* BOTTOM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between py-6 text-sm"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="#" className="font-medium text-black">
            carRental
          </a>. All rights reserved.
        </p>

        <ul className="flex items-center gap-3">
          <li><a href="#" className="hover:text-black">Privacy</a></li>
          <span>|</span>
          <li><a href="#" className="hover:text-black">Terms</a></li>
          <span>|</span>
          <li><a href="#" className="hover:text-black">Cookies</a></li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Footer