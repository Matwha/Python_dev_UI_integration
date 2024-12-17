```typescript
import React, { useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  children
}) => {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    const id = setTimeout(() => setShow(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShow(false);
  };

  return (
    <div className="relative inline-block">
      {show && (
        <div
          className={clsx(
            'absolute z-50 px-2 py-1 text-sm bg-gray-900 text-yellow-400 rounded shadow-lg border border-yellow-400/20',
            {
              'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
              'top-1/2 left-full -translate-y-1/2 ml-2': position === 'right',
              'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
              'top-1/2 right-full -translate-y-1/2 mr-2': position === 'left',
            }
          )}
        >
          {content}
        </div>
      )}
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
    </div>
  );
};
```