import React from 'react';
import { ActorRefFrom } from 'xstate';
import { Button } from '../../ui/Button';
import { testMachine } from '../../../machines/testMachine';
import { useSelector } from '@xstate/react';

interface ActionPanelProps {
  actor: ActorRefFrom<typeof testMachine>;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ actor }) => {
  const state = useSelector(actor, state => state);
  const send = actor.send;

  return (
    <div className="bg-black/50 p-4 rounded-lg space-y-3">
      <h3 className="font-semibold text-yellow-400">Available Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => send({ type: 'START' })}
          disabled={!state.matches('idle')}
        >
          Start
        </Button>
        <Button
          onClick={() => send({ type: 'CHARGE' })}
          disabled={!state.matches('ready')}
        >
          Charge
        </Button>
        <Button
          onClick={() => send({ type: 'DISCHARGE' })}
          disabled={!state.matches('ready')}
        >
          Discharge
        </Button>
        <Button
          onClick={() => send({ type: 'STOP' })}
          disabled={!state.matches('charging') && !state.matches('discharging')}
        >
          Stop
        </Button>
        <Button
          onClick={() => send({ type: 'ERROR', error: 'Test error' })}
          disabled={state.matches('idle') || state.matches('error')}
          className="bg-red-600 hover:bg-red-700"
        >
          Trigger Error
        </Button>
        <Button
          onClick={() => send({ type: 'RESET' })}
          disabled={!state.matches('error')}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};