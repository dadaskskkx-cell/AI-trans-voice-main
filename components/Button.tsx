import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-gradient-to-r from-[#D02034] via-[#9917B4] to-[#00F0FF] hover:opacity-90 text-white shadow-[#D02034]/25 border border-transparent",
    secondary: "bg-gradient-to-r from-[#D02034] to-[#2181FF] hover:opacity-90 text-white shadow-[#2181FF]/25 border border-transparent",
    outline: "border border-[#D02034] text-[#D02034] hover:bg-[#D02034]/10",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};