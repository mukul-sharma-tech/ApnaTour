import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Upper Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-accent-400">Apna</span>Tour
            </h2>
            <p className="text-gray-300 mb-4">Your personalized journey through India's most beautiful destinations. Experience local culture, flavors, and adventures tailored just for you.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#travel-modes" className="text-gray-300 hover:text-white transition-colors">How to Reach</a></li>
              <li><a href="#attractions" className="text-gray-300 hover:text-white transition-colors">Attractions</a></li>
              <li><a href="#accommodations" className="text-gray-300 hover:text-white transition-colors">Accommodations</a></li>
              <li><a href="#local-info" className="text-gray-300 hover:text-white transition-colors">Local Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-400">Popular Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rishikesh</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mussoorie</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Nainital</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Haridwar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Jim Corbett</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Auli</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kedarnath</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-accent-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Travel Plaza, Mall Road, Dehradun, Uttarakhand, India - 248001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-accent-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-accent-400" />
                <span className="text-gray-300">info@apnatour.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-primary-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300 text-sm">Stay updated with our latest travel packages and seasonal offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-md w-full md:w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="bg-accent-500 hover:bg-accent-600 transition-colors px-4 py-2 rounded-r-md font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              <p>&copy; 2025 Apna Tour. All rights reserved.</p>
            </div>
            <div className="mt-2 md:mt-0">
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;