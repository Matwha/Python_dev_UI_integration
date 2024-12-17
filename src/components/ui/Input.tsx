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
  disabled,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className={clsx(
          "block text-sm font-medium",
          disabled ? "text-yellow-400/50" : "text-yellow-400"
        )}>
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full rounded-lg px-4 py-2",
          "transition-all duration-200",
          "placeholder-yellow-400/30",
          disabled ? [
            "bg-gray-950 border-yellow-400/10 text-yellow-400/50",
            "cursor-not-allowed"
          ] : [
            "bg-gray-950 border-yellow-400/20 text-yellow-400",
            "hover:border-yellow-400/30",
            "focus:border-yellow-400/40 focus:ring-2 focus:ring-yellow-400/20",
            "focus:bg-black"
          ],
          error && "border-red-400/50",
          className
        )}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};