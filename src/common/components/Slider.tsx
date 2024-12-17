```tsx
import React from 'react';
import { clsx } from 'clsx';

interface SliderProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className
}) => {
  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex justify-between">
        <label className="text-yellow-400">{label}</label>
        <span className="text-yellow-400">{value}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={clsx(
          'w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
          'range-thumb:w-4 range-thumb:h-4 range-thumb:rounded-full',
          'range-thumb:bg-yellow-400 range-thumb:border-none',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
    </div>
  );
};
```