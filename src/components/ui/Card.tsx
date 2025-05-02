import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverStyles = hoverable 
    ? 'transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer' 
    : '';

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardImage: React.FC<{src: string; alt: string; className?: string}> = ({ src, alt, className = '' }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
);

export const CardContent: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-primary-800 mb-2 ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
);

export const CardFooter: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => (
  <div className={`p-4 pt-0 ${className}`}>
    {children}
  </div>
);

export default Card;