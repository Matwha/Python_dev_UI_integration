```typescript
import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        {
          'bg-gray-900/90': variant === 'default',
          'border border-yellow-400/20': variant === 'bordered',
          'bg-gray-900/50 backdrop-blur-sm border border-yellow-400/10': variant === 'glass',
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```