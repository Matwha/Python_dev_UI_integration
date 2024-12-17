import React from 'react';
import { Button } from '@/common/components/Button';
import { State } from '../../types';

interface StateListProps {
  states: State[];
  selectedStateId: string | null;
  onStateSelect: (id: string) => void;
}

export const StateList: React.FC<StateListProps> = ({
  states,
  selectedStateId,
  onStateSelect,
}) => {
  return (
    <div className="space-y-4">
      {states.map((state) => (
        <div
          key={state.id}
          className="bg-gray-900/90 p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-medium">{state.name}</span>
              <span className="px-2 py-0.5 text-xs bg-yellow-400/10 rounded text-yellow-400">
                {state.type}
              </span>
              {state.initial && (
                <span className="px-2 py-0.5 text-xs bg-green-400/10 text-green-400 rounded">
                  Initial
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStateSelect(state.id)}
              className={`hover:bg-yellow-400/10 ${
                selectedStateId === state.id ? 'bg-yellow-400/10' : ''
              }`}
            >
              {state.id === selectedStateId ? 'Close' : 'Edit'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};