```typescript
import React from 'react';
import { FormGroup } from './FormGroup';
import { FormLabel } from './FormLabel';
import { FormError } from './FormError';

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children
}) => {
  return (
    <FormGroup error={error}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      {children}
      {error && <FormError>{error}</FormError>}
    </FormGroup>
  );
};
```