```typescript
import React from 'react';
import { clsx } from 'clsx';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number };
  gap?: number;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  gap = 4,
  ...props
}) => {
  const getColsClass = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    return clsx(
      cols.sm && `sm:grid-cols-${cols.sm}`,
      cols.md && `md:grid-cols-${cols.md}`,
      cols.lg && `lg:grid-cols-${cols.lg}`
    );
  };

  return (
    <div
      className={clsx(
        'grid',
        getColsClass(),
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```