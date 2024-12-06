import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  className,
  disabled,
  children,
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
      <select
        className={clsx(
          "w-full rounded-lg px-4 py-2 appearance-none",
          "transition-all duration-200",
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
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};