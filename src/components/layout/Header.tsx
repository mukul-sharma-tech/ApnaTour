import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { LanguageSelector } from '../ui/LanguageSelector';
import { Route } from 'react-router-dom';
import TravelBooking from '../home/Travel';

interface HeaderProps {
  goHome: () => void;
}

<Route path="/travelbooking" element={<TravelBooking />} />

const Header: React.FC<HeaderProps> = ({ goHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = `font-medium transition-colors ${
    isScrolled ? 'text-primary-800 hover:text-accent-500' : 'text-white hover:text-accent-300'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-primary-800' : 'text-white'}`}>
            <span className="text-accent-500">Apna</span>Tour
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className={navLinkClass}
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
          >
            Return to Home
          </a>
          <a href="#travel-modes" className={navLinkClass}>Travel</a>
          <a href="#attractions" className={navLinkClass}>Attractions</a>
          <a href="#accommodations" className={navLinkClass}>Stay</a>
          <a href="#local-info" className={navLinkClass}>Local Info</a>

          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className={`flex items-center space-x-1 font-medium ${
                isScrolled ? 'text-primary-800 hover:text-accent-500' : 'text-white hover:text-accent-300'
              }`}
            >
              <Globe size={18} />
              <span>Language</span>
              <ChevronDown size={16} />
            </button>
            {isLanguageMenuOpen && <LanguageSelector onClose={() => setIsLanguageMenuOpen(false)} />}
          </div>
        </nav>
        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-primary-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-primary-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#"
              className="font-medium text-primary-800 hover:text-accent-500"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                goHome();
              }}
            >
              Home
            </a>
            <a href="#travel-modes" className="font-medium text-primary-800 hover:text-accent-500">Travel</a>
            <a href="#attractions" className="font-medium text-primary-800 hover:text-accent-500">Attractions</a>
            <a href="#accommodations" className="font-medium text-primary-800 hover:text-accent-500">Stay</a>
            <a href="#local-info" className="font-medium text-primary-800 hover:text-accent-500">Local Info</a>

            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 font-medium text-primary-800 hover:text-accent-500"
              >
                <Globe size={18} />
                <span>Language</span>
                <ChevronDown size={16} />
              </button>

              {isLanguageMenuOpen && (
                <div className="mt-2 pl-6 flex flex-col space-y-2">
                  <button className="text-left text-primary-800 hover:text-accent-500 font-medium">English</button>
                  <button className="text-left text-primary-800 hover:text-accent-500">हिंदी</button>
                  <button className="text-left text-primary-800 hover:text-accent-500">स्थानीय भाषा</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
