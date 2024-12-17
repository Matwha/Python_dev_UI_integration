```typescript
import React from 'react';
import { clsx } from 'clsx';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  className,
  required,
  ...props
}) => {
  return (
    <label
      className={clsx('block text-sm font-medium text-yellow-400', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
};
```