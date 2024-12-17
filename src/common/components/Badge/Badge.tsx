```typescript
import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-yellow-400/10 text-yellow-400': variant === 'default',
          'bg-green-400/10 text-green-400': variant === 'success',
          'bg-amber-400/10 text-amber-400': variant === 'warning',
          'bg-red-400/10 text-red-400': variant === 'error',
          'bg-blue-400/10 text-blue-400': variant === 'info',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-0.5 text-sm': size === 'md',
          'px-3 py-1 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
```