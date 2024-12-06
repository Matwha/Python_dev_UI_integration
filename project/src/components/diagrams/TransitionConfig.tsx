import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
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

  const getTransitionTarget = (transition: any): string => {
    if (typeof transition === 'string') return transition;
    if (transition && typeof transition.target === 'string') return transition.target;
    return 'unknown';
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400">Transitions</h3>

      <div className="space-y-4">
        {Object.entries(states).map(([stateName, state]) =>
          Object.entries(state.on || {}).map(([event, transition]) => (
            <div
              key={`${stateName}-${event}`}
              className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
            >
              <div className="flex items-center gap-4">
                <span className="text-yellow-400">{stateName}</span>
                <span className="text-gray-400">→</span>
                <span className="text-yellow-400">{getTransitionTarget(transition)}</span>
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

      <div className="grid grid-cols-3 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
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
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
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
          className="bg-black/40 border-yellow-400/20"
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