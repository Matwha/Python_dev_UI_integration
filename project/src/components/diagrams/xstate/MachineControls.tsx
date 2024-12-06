import React from 'react';
import { ActorRefFrom } from 'xstate';
import { Button } from '../../ui/Button';
import { toggleMachine } from '../../../machines/toggleMachine';
import { useSelector } from '@xstate/react';

interface MachineControlsProps {
  actor: ActorRefFrom<typeof toggleMachine>;
}

export const MachineControls: React.FC<MachineControlsProps> = ({ actor }) => {
  const state = useSelector(actor, state => state.value);
  const context = useSelector(actor, state => state.context);
  const send = actor.send;

  return (
    <div className="relative bg-black/50 p-4 rounded-lg space-y-4 overflow-hidden">
      {/* Honeycomb background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="honeycomb-controls"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.5)"
            >
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="rgba(255, 191, 36, 0.2)"
                strokeWidth="1"
              />
              <path
                d="M28 0L28 34L0 50L0 16L28 0"
                fill="rgba(255, 191, 36, 0.05)"
                stroke="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-controls)" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="font-semibold text-yellow-400">Controls</h3>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            onClick={() => send({ type: 'TOGGLE' })}
            disabled={context.maxCount ? context.count >= context.maxCount : false}
          >
            Toggle
          </Button>
          <Button
            onClick={() => send({ type: 'RESET' })}
            disabled={state === 'inactive' && context.count === 0}
          >
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-400 mt-4">
          {context.maxCount && (
            <div>
              Remaining toggles: {context.maxCount - context.count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};