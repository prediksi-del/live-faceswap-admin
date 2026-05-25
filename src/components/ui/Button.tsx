import React from 'react';
import { clsx } from 'clsx';

// Definisikan tipe langsung di sini agar tidak memicu error jalur impor eksternal
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variant === 'primary' && "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10",
        variant === 'secondary' && "bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300",
        variant === 'danger' && "bg-red-600 hover:bg-red-500 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
