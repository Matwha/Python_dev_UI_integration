```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR');
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR');
};

export const isNetworkError = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    ('code' in error || error.message.includes('network') || error.message.includes('connection'))
  );
};

export const formatErrorMessage = (error: unknown): string => {
  const appError = handleError(error);
  return appError.message;
};
```