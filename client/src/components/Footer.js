import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-teal-600 text-lg font-semibold mb-4">
              eTemp Store
            </h2>
            <p className="text-sm">
              Empowering your email communications with professional and
              customizable templates.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiMail className="mr-2 text-teal-600" />
                <a
                  href="mailto:priyanshu0dubey@gmail.com"
                  className="text-sm hover:text-teal-600 transition-colors duration-300">
                  priyanshu0dubey@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-teal-600" />
                <a
                  href="tel:+447444764677"
                  className="text-sm hover:text-teal-600 transition-colors duration-300">
                  (+44) 7444764677
                </a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="mr-2 text-teal-600" />
                <span className="text-sm">Swansea University Bay Campus</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-2">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 text-sm font-medium rounded-r-md hover:bg-teal-700 transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="https://www.linkedin.com/in/priyanshudubey/"
                  className="text-gray-400 hover:text-teal-600 transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </a>
              )
            )}
          </div>
          <div className="text-sm text-gray-500">
            © {currentYear} eTemp Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
