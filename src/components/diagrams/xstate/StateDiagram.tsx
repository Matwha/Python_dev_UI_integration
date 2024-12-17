import React from 'react';
import { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { testMachine } from '../../../machines/testMachine';

interface StateDiagramProps {
  actor: ActorRefFrom<typeof testMachine>;
}

export const StateDiagram: React.FC<StateDiagramProps> = ({ actor }) => {
  const state = useSelector(actor, state => state);

  // Calculate positions for the states
  const statePositions = {
    idle: { x: 200, y: 100 },
    ready: { x: 200, y: 250 },
    charging: { x: 100, y: 400 },
    discharging: { x: 300, y: 400 },
    error: { x: 400, y: 250 },
  };

  // Define transitions
  const transitions = [
    { from: 'idle', to: 'ready', label: 'START' },
    { from: 'ready', to: 'charging', label: 'CHARGE' },
    { from: 'ready', to: 'discharging', label: 'DISCHARGE' },
    { from: 'charging', to: 'ready', label: 'STOP' },
    { from: 'discharging', to: 'ready', label: 'STOP' },
    { from: 'charging', to: 'error', label: 'ERROR' },
    { from: 'discharging', to: 'error', label: 'ERROR' },
    { from: 'error', to: 'ready', label: 'RESET' },
  ];

  // Calculate path for transitions
  const getTransitionPath = (from: string, to: string) => {
    const start = statePositions[from as keyof typeof statePositions];
    const end = statePositions[to as keyof typeof statePositions];
    
    // Calculate control points for curved paths
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offset = distance * 0.2;
    
    const controlX = midX - offset * Math.sin(angle);
    const controlY = midY + offset * Math.cos(angle);
    
    return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
  };

  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <svg width="600" height="500" className="w-full">
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path 
              d="M 20 0 L 0 0 0 20" 
              fill="none" 
              stroke="rgba(255, 191, 36, 0.1)" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Transitions */}
        {transitions.map(({ from, to, label }) => {
          const path = getTransitionPath(from, to);
          const isActive = state.matches(from);
          const isError = label === 'ERROR';
          
          return (
            <g key={`${from}-${to}`}>
              <path
                d={path}
                fill="none"
                stroke={isError ? '#f87171' : isActive ? '#34d399' : '#fbbf24'}
                strokeWidth={2}
                className={isActive ? 'animate-pulse' : ''}
              />
              {/* Transition label */}
              <text
                x={statePositions[from as keyof typeof statePositions].x}
                y={statePositions[from as keyof typeof statePositions].y - 10}
                fill={isError ? '#f87171' : '#fbbf24'}
                fontSize={12}
                textAnchor="middle"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* States */}
        {Object.entries(statePositions).map(([stateName, pos]) => {
          const isActive = state.matches(stateName);
          const isError = stateName === 'error';
          
          return (
            <g key={stateName}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={30}
                className={`
                  ${isActive ? 'stroke-green-400 shadow-lg shadow-green-400/50' : 'stroke-yellow-400'}
                  ${isError ? 'stroke-red-400' : ''}
                  fill-gray-900/90
                `}
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`
                  text-sm font-medium
                  ${isActive ? 'fill-green-400' : 'fill-yellow-400'}
                  ${isError ? 'fill-red-400' : ''}
                `}
              >
                {stateName}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};