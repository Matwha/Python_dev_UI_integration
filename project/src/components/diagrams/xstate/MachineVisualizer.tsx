import React from 'react';
import { useSelector } from '@xstate/react';
import { ActorRefFrom } from 'xstate';
import { toggleMachine } from '../../../machines/toggleMachine';

interface MachineVisualizerProps {
  actor: ActorRefFrom<typeof toggleMachine>;
}

export const MachineVisualizer: React.FC<MachineVisualizerProps> = ({ actor }) => {
  const state = useSelector(actor, state => state.value);
  const context = useSelector(actor, state => state.context);

  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <svg width="600" height="300" className="w-full">
        {/* Honeycomb Pattern */}
        <defs>
          <pattern
            id="honeycomb"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="rgba(255, 191, 36, 0.1)"
              strokeWidth="1"
            />
            <path
              d="M28 0L28 34L0 50L0 16L28 0"
              fill="rgba(255, 191, 36, 0.03)"
              stroke="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#honeycomb)" />

        {/* States */}
        <g transform="translate(100,150)">
          <circle 
            r="40" 
            className={`fill-gray-900/90 stroke-2 ${
              state === 'inactive' ? 'stroke-green-400' : 'stroke-yellow-400'
            }`}
          />
          <text 
            textAnchor="middle" 
            dominantBaseline="middle"
            className={`text-sm font-medium ${
              state === 'inactive' ? 'fill-green-400' : 'fill-yellow-400'
            }`}
          >
            Inactive
          </text>
        </g>

        <g transform="translate(500,150)">
          <circle 
            r="40" 
            className={`fill-gray-900/90 stroke-2 ${
              state === 'active' ? 'stroke-green-400' : 'stroke-yellow-400'
            }`}
          />
          <text 
            textAnchor="middle" 
            dominantBaseline="middle"
            className={`text-sm font-medium ${
              state === 'active' ? 'fill-green-400' : 'fill-yellow-400'
            }`}
          >
            Active
          </text>
        </g>

        {/* Transitions */}
        <path
          d="M 140 150 C 300 100 300 100 460 150"
          fill="none"
          className="stroke-yellow-400 stroke-2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 460 150 C 300 200 300 200 140 150"
          fill="none"
          className="stroke-yellow-400 stroke-2"
          markerEnd="url(#arrowhead)"
        />

        {/* Arrowhead marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="fill-yellow-400"
            />
          </marker>
        </defs>

        {/* Labels */}
        <text x="300" y="120" textAnchor="middle" className="fill-yellow-400 text-sm">
          TOGGLE
        </text>
        <text x="300" y="180" textAnchor="middle" className="fill-yellow-400 text-sm">
          TOGGLE / after 2s
        </text>
      </svg>

      <div className="mt-4 space-y-2">
        <div className="text-sm">
          <span className="text-gray-400">Current State:</span>
          <span className="ml-2 text-yellow-400">{state}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Count:</span>
          <span className="ml-2 text-yellow-400">{context.count}</span>
        </div>
      </div>
    </div>
  );
};