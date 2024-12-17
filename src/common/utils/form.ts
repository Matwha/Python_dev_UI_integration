```typescript
type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export const required = (message = 'This field is required'): ValidationRule<any> => ({
  validate: (value: any) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },
  message,
});

export const minLength = (
  length: number,
  message = `Must be at least ${length} characters`
): ValidationRule<string> => ({
  validate: (value: string) => value.length >= length,
  message,
});

export const maxLength = (
  length: number,
  message = `Must be no more than ${length} characters`
): ValidationRule<string> => ({
  validate: (value: string) => value.length <= length,
  message,
});

export const pattern = (
  regex: RegExp,
  message = 'Invalid format'
): ValidationRule<string> => ({
  validate: (value: string) => regex.test(value),
  message,
});

export const validate = <T>(
  value: T,
  rules: ValidationRule<T>[]
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};

export const validateForm = <T extends Record<string, any>>(
  values: T,
  validationSchema: Record<keyof T, ValidationRule<T[keyof T]>[]>
): Record<keyof T, string | null> => {
  const errors: Record<string, string | null> = {};
  
  for (const field in validationSchema) {
    errors[field] = validate(values[field], validationSchema[field]);
  }
  
  return errors;
};
```