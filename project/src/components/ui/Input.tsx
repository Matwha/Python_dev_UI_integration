import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-yellow-400">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2',
          'text-yellow-400 placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
          'transition-colors',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};