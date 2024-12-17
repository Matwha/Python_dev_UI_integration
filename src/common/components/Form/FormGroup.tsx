```typescript
import React from 'react';
import { clsx } from 'clsx';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  error,
  ...props
}) => {
  return (
    <div className={clsx('space-y-1', className)} {...props}>
      {children}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};
```