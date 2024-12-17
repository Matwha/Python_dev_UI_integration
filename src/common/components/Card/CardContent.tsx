```typescript
import React from 'react';
import { clsx } from 'clsx';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  spacing = 'md',
  ...props
}) => {
  return (
    <div
      className={clsx(
        {
          'space-y-0': spacing === 'none',
          'space-y-2': spacing === 'sm',
          'space-y-4': spacing === 'md',
          'space-y-6': spacing === 'lg',
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