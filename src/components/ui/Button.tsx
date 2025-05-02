import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const baseStyles = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-500',
    secondary: 'bg-primary-700 hover:bg-primary-800 text-white focus:ring-primary-700',
    outline: 'border border-accent-500 text-accent-500 hover:bg-accent-50 focus:ring-accent-500',
    text: 'text-accent-500 hover:text-accent-600 hover:bg-accent-50 focus:ring-accent-500',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;