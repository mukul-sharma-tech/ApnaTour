import React from 'react';

interface LanguageSelectorProps {
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
      <div className="py-1">
        <button 
          className="w-full text-left px-4 py-2 text-sm text-primary-800 hover:bg-gray-100 font-medium"
          onClick={onClose}
        >
          English
        </button>
        <button 
          className="w-full text-left px-4 py-2 text-sm text-primary-800 hover:bg-gray-100"
          onClick={onClose}
        >
          हिंदी
        </button>
        <button 
          className="w-full text-left px-4 py-2 text-sm text-primary-800 hover:bg-gray-100"
          onClick={onClose}
        >
          स्थानीय भाषा
        </button>
      </div>
    </div>
  );
};