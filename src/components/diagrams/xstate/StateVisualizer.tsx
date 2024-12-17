import React from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { testMachine } from '../../../machines/testMachine';
import { StateDiagram } from './StateDiagram';

interface StateVisualizerProps {
  actor: ActorRefFrom<typeof testMachine>;
}

export const StateVisualizer: React.FC<StateVisualizerProps> = ({ actor }) => {
  const state = useSelector(actor, state => state);

  return (
    <div className="space-y-6">
      <div className="bg-black/50 p-4 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-yellow-400">Current State</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Status:</span>
            {state.hasError ? (
              <span className="text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Error
              </span>
            ) : (
              <span className="text-green-400">Active</span>
            )}
          </div>
        </div>

        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-lg font-semibold text-yellow-400">
            {state.value as string}
          </p>
        </div>

        {state.context.error && (
          <div className="bg-red-900/20 p-3 rounded-lg border border-red-400/20">
            <p className="text-sm text-red-400">{state.context.error}</p>
          </div>
        )}
      </div>

      <StateDiagram actor={actor} />
    </div>
  );
};