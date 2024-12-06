import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface StateConfigProps {
  states: Record<string, any>;
  onStatesChange: (states: Record<string, any>) => void;
}

export const StateConfig: React.FC<StateConfigProps> = ({
  states,
  onStatesChange,
}) => {
  const [newState, setNewState] = useState('');

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
    <div className="bg-black/50 p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-yellow-400">States</h3>
      
      <div className="space-y-3">
        {Object.entries(states).map(([stateName, state]) => (
          <div
            key={stateName}
            className="flex items-center justify-between bg-black/30 p-3 rounded-lg"
          >
            <span className="text-yellow-400">{stateName}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeState(stateName)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="New state name"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          className="bg-black/30 border-yellow-400/20"
        />
        <Button onClick={addState} disabled={!newState}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};