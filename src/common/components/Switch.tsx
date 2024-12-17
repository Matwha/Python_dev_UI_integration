```tsx
import React from 'react';
import { clsx } from 'clsx';

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className
}) => {
  return (
    <label className={clsx(
      'flex items-center cursor-pointer',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={clsx(
          'block w-14 h-8 rounded-full transition-colors duration-200',
          checked ? 'bg-yellow-400' : 'bg-gray-600'
        )} />
        <div className={clsx(
          'absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200',
          checked && 'transform translate-x-6'
        )} />
      </div>
      <span className="ml-3 text-yellow-400">{label}</span>
    </label>
  );
};
```