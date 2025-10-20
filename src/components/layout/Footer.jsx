import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* BZU Student Network */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">BZU Student Network</h3>
          <p className="text-gray-400 mb-4">
            Connecting students based on skills and interests at Bahauddin Zakariya University.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Students</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Skills Directory</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guidelines</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
          <p className="text-gray-400 mb-2">Bahauddin Zakariya University</p>
          <p className="text-gray-400 mb-2">Bosan Road, Multan</p>
          <p className="text-gray-400 mb-2">Punjab, Pakistan</p>
          <p className="text-gray-400 mb-2">Email: contact@bzustudents.edu.pk</p>
          <p className="text-gray-400">Phone: +92 61 9210071</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>© 2025 BZU Student Skills Network. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;