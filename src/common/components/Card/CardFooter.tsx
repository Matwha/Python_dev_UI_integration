```typescript
import React from 'react';
import { clsx } from 'clsx';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  bordered = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'mt-4 pt-4 flex items-center justify-end gap-4',
        bordered && 'border-t border-yellow-400/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```