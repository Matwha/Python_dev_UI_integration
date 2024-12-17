```typescript
import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormError: React.FC<FormErrorProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={clsx(
        'flex items-center gap-1 text-sm text-red-400',
        className
      )}
      {...props}
    >
      <AlertCircle className="w-4 h-4" />
      {children}
    </p>
  );
};
```