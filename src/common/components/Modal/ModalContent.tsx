```typescript
import React from 'react';
import { clsx } from 'clsx';

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className,
  scrollable = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'p-4',
        scrollable && 'max-h-[60vh] overflow-y-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```