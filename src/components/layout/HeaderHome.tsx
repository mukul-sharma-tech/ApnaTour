import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { LanguageSelector } from '../ui/LanguageSelector';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Travel from '../home/Travel';

type HeaderProps = {
  onHomeClick: () => void;
};

const HeaderHome = () => {
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

  const navLinkClass = `font-medium transition-colors ${isScrolled ? 'text-primary-800 hover:text-accent-500' : 'text-white hover:text-accent-300'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
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
          <a href="#home" className={navLinkClass}>Home</a>
          {/* <a href="#home" className="font-medium text-primary-800 hover:text-accent-500">Home</a> */}

          <a href="#travelHome" className={navLinkClass}>Travel</a>
          <a href="#destinationHome" className={navLinkClass}>Destination</a>
          <a href="#hotelHome" className={navLinkClass}>Stay</a>
          <a href="#attractionsHome" className={navLinkClass}>Attractions</a>

          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className={`flex items-center space-x-1 font-medium ${isScrolled ? 'text-primary-800 hover:text-accent-500' : 'text-white hover:text-accent-300'
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
            <a href="#home" className="font-medium text-primary-800 hover:text-accent-500">Home</a>
            <a href="#travelHome" className="font-medium text-primary-800 hover:text-accent-500">Travel</a>
            <a href="#destinationHome" className="font-medium text-primary-800 hover:text-accent-500">Destination</a>
            <a href="#hotelHome" className="font-medium text-primary-800 hover:text-accent-500">Stay</a>
            <a href="#attractionsHome" className="font-medium text-primary-800 hover:text-accent-500">Attractions</a>


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

export default HeaderHome;
