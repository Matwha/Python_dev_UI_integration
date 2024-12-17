```tsx
import React from 'react';

interface Point {
  x: number;
  y: number;
}

interface TransitionLineProps {
  from: Point;
  to: Point;
  label: string;
  isActive: boolean;
  isError?: boolean;
}

export const TransitionLine: React.FC<TransitionLineProps> = ({
  from,
  to,
  label,
  isActive,
  isError,
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  // Control point offset for curve
  const offset = length * 0.2;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Calculate control point
  const controlX = midX - offset * Math.sin(angle);
  const controlY = midY + offset * Math.cos(angle);

  // Calculate label position
  const labelX = controlX;
  const labelY = controlY - 15;

  // Create the path
  const path = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;

  // Calculate arrow points
  const arrowLength = 10;
  const arrowWidth = 6;
  const arrowAngle = Math.atan2(to.y - controlY, to.x - controlX);
  const arrowX1 = to.x - arrowLength * Math.cos(arrowAngle - Math.PI / 6);
  const arrowY1 = to.y - arrowLength * Math.sin(arrowAngle - Math.PI / 6);
  const arrowX2 = to.x - arrowLength * Math.cos(arrowAngle + Math.PI / 6);
  const arrowY2 = to.y - arrowLength * Math.sin(arrowAngle + Math.PI / 6);

  return (
    <>
      {/* Path */}
      <path
        d={path}
        fill="none"
        stroke={isError ? '#f87171' : isActive ? '#34d399' : '#fbbf24'}
        strokeWidth={2}
        className={isActive ? 'animate-pulse' : ''}
      />

      {/* Arrow */}
      <path
        d={`M ${to.x} ${to.y} L ${arrowX1} ${arrowY1} L ${arrowX2} ${arrowY2} Z`}
        fill={isError ? '#f87171' : isActive ? '#34d399' : '#fbbf24'}
      />

      {/* Label */}
      <foreignObject
        x={labelX - 50}
        y={labelY - 10}
        width={100}
        height={20}
        style={{ overflow: 'visible' }}
      >
        <div className="flex justify-center">
          <span className="px-2 py-1 rounded bg-black/80 text-xs font-medium border border-yellow-400/20">
            {label}
          </span>
        </div>
      </foreignObject>
    </>
  );
};
```