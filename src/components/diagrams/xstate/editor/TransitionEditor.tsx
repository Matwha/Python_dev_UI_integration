import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';

interface Transition {
  id: string;
  event: string;
  target: string;
  guard?: string;
  actions?: string[];
}

interface TransitionEditorProps {
  transitions: Transition[];
  availableStates: string[];
  onTransitionsChange: (transitions: Transition[]) => void;
}

export const TransitionEditor: React.FC<TransitionEditorProps> = ({
  transitions,
  availableStates,
  onTransitionsChange,
}) => {
  const [newTransition, setNewTransition] = useState<Partial<Transition>>({});

  const addTransition = () => {
    if (newTransition.event && newTransition.target) {
      onTransitionsChange([
        ...transitions,
        {
          id: crypto.randomUUID(),
          event: newTransition.event,
          target: newTransition.target,
          guard: newTransition.guard,
          actions: newTransition.actions || [],
        },
      ]);
      setNewTransition({});
    }
  };

  const removeTransition = (id: string) => {
    onTransitionsChange(transitions.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-yellow-400">Transitions</h3>

      <div className="space-y-2">
        {transitions.map((transition) => (
          <div
            key={transition.id}
            className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-yellow-400/20 hover:bg-black/50 hover:border-yellow-400/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-400">{transition.event}</span>
              <ArrowRight className="w-4 h-4 text-yellow-400/60" />
              <span className="text-yellow-400">{transition.target}</span>
              {transition.guard && (
                <span className="text-sm px-2 py-1 rounded bg-yellow-400/10 text-yellow-400/80">
                  [{transition.guard}]
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeTransition(transition.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          placeholder="Event name"
          value={newTransition.event || ''}
          onChange={(e) =>
            setNewTransition({ ...newTransition, event: e.target.value })
          }
          className="bg-black/60 border-yellow-400/20"
        />

        <select
          className="bg-black/60 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.target || ''}
          onChange={(e) =>
            setNewTransition({ ...newTransition, target: e.target.value })
          }
        >
          <option value="">Target State</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <Input
          placeholder="Guard condition (optional)"
          value={newTransition.guard || ''}
          onChange={(e) =>
            setNewTransition({ ...newTransition, guard: e.target.value })
          }
          className="bg-black/60 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addTransition}
        disabled={!newTransition.event || !newTransition.target}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Transition
      </Button>
    </div>
  );
};