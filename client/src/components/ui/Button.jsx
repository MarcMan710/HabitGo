// components/ui/Button.jsx
import React from 'react';

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  type = 'button', // Default type to 'button'
  ...rest
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150';

  // Size styles
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary border border-transparent',
    secondary: 'bg-background hover:bg-secondary-light text-secondary focus:ring-secondary border border-border',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-transparent',
    ghost: 'bg-transparent hover:bg-secondary-light text-text focus:ring-secondary border border-transparent shadow-none',
    // Add more variants as needed (e.g., outline)
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
