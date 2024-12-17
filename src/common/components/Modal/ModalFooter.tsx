```typescript
import React from 'react';
import { clsx } from 'clsx';

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-end gap-3 p-4 border-t border-yellow-400/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```