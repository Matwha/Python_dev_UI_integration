import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface TransitionConfigProps {
  states: Record<string, any>;
  onStatesChange: (states: Record<string, any>) => void;
}

export const TransitionConfig: React.FC<TransitionConfigProps> = ({
  states,
  onStatesChange,
}) => {
  const [newTransition, setNewTransition] = useState({
    from: '',
    to: '',
    event: '',
  });

  const addTransition = () => {
    if (newTransition.from && newTransition.to && newTransition.event) {
      const updatedStates = { ...states };
      if (!updatedStates[newTransition.from].on) {
        updatedStates[newTransition.from].on = {};
      }
      updatedStates[newTransition.from].on[newTransition.event] = {
        target: newTransition.to,
      };
      onStatesChange(updatedStates);
      setNewTransition({ from: '', to: '', event: '' });
    }
  };

  const removeTransition = (fromState: string, event: string) => {
    const updatedStates = { ...states };
    delete updatedStates[fromState].on[event];
    onStatesChange(updatedStates);
  };

  return (
    <div className="bg-black/50 p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-yellow-400">Transitions</h3>

      <div className="space-y-3">
        {Object.entries(states).map(([stateName, state]) =>
          Object.entries(state.on || {}).map(([event, transition]) => (
            <div
              key={`${stateName}-${event}`}
              className="flex items-center justify-between bg-black/30 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-yellow-400">{stateName}</span>
                <span className="text-gray-400">→</span>
                <span className="text-yellow-400">
                  {(transition as any).target}
                </span>
                <span className="text-gray-400">({event})</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeTransition(stateName, event)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <select
          className="bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.from}
          onChange={(e) =>
            setNewTransition({ ...newTransition, from: e.target.value })
          }
        >
          <option value="">From State</option>
          {Object.keys(states).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className="bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.to}
          onChange={(e) =>
            setNewTransition({ ...newTransition, to: e.target.value })
          }
        >
          <option value="">To State</option>
          {Object.keys(states).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <Input
          placeholder="Event name"
          value={newTransition.event}
          onChange={(e) =>
            setNewTransition({ ...newTransition, event: e.target.value })
          }
          className="bg-black/30 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addTransition}
        disabled={!newTransition.from || !newTransition.to || !newTransition.event}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Transition
      </Button>
    </div>
  );
};