import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Edit } from 'lucide-react';

interface StateConfigProps {
  states: Record<string, any>;
  onStatesChange: (states: Record<string, any>) => void;
}

export const StateConfig: React.FC<StateConfigProps> = ({ states, onStatesChange }) => {
  const [newState, setNewState] = useState('');
  const [editingState, setEditingState] = useState<string | null>(null);

  const addState = () => {
    if (newState && !states[newState]) {
      onStatesChange({
        ...states,
        [newState]: {
          on: {},
          meta: {
            description: '',
          },
        },
      });
      setNewState('');
    }
  };

  const removeState = (stateName: string) => {
    const newStates = { ...states };
    delete newStates[stateName];
    onStatesChange(newStates);
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400">States</h3>

      <div className="space-y-4">
        {Object.entries(states).map(([stateName, state]) => (
          <div
            key={stateName}
            className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            <div>
              <span className="text-yellow-400">{stateName}</span>
              {state.meta?.description && (
                <p className="text-sm text-gray-400 mt-1">{state.meta.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingState(stateName)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeState(stateName)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="State name"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          className="bg-black/40 border-yellow-400/20"
        />
        <Button onClick={addState} disabled={!newState}>
          <Plus className="w-4 h-4 mr-2" />
          Add State
        </Button>
      </div>
    </div>
  );
};