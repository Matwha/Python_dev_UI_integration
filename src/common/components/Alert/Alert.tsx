```typescript
import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle, X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  className,
  variant = 'info',
  title,
  onClose,
  ...props
}) => {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const Icon = icons[variant];

  return (
    <div
      className={clsx(
        'relative rounded-lg border p-4',
        {
          'bg-blue-400/10 border-blue-400/20 text-blue-400': variant === 'info',
          'bg-green-400/10 border-green-400/20 text-green-400': variant === 'success',
          'bg-yellow-400/10 border-yellow-400/20 text-yellow-400': variant === 'warning',
          'bg-red-400/10 border-red-400/20 text-red-400': variant === 'error',
        },
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        <Icon className="w-5 h-5 shrink-0" />
        <div className="flex-1">
          {title && <div className="font-medium mb-1">{title}</div>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
```