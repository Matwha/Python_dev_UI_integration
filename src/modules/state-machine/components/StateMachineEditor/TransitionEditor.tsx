```typescript
import React, { useState } from 'react';
import { ArrowRight, Plus, Shield } from 'lucide-react';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { Transition, Guard } from '../../types';

interface TransitionEditorProps {
  stateId: string;
  availableStates: string[];
  transitions: Transition[];
  guards: Guard[];
  onTransitionAdd: (transition: Omit<Transition, 'id'>) => void;
  onGuardAdd: (guard: Omit<Guard, 'id'>) => void;
}

export const TransitionEditor: React.FC<TransitionEditorProps> = ({
  availableStates,
  transitions,
  guards,
  onTransitionAdd,
  onGuardAdd
}) => {
  const [newTransition, setNewTransition] = useState({
    event: '',
    target: '',
    guard: ''
  });

  const [newGuard, setNewGuard] = useState({
    name: '',
    condition: ''
  });

  const handleTransitionAdd = () => {
    if (newTransition.event && newTransition.target) {
      onTransitionAdd({
        event: newTransition.event,
        target: newTransition.target,
        guard: newTransition.guard || undefined
      });
      setNewTransition({ event: '', target: '', guard: '' });
    }
  };

  const handleGuardAdd = () => {
    if (newGuard.name && newGuard.condition) {
      onGuardAdd(newGuard);
      setNewGuard({ name: '', condition: '' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Transitions Section */}
      <div className="bg-gray-800/60 p-6 rounded-xl border border-amber-400/30 backdrop-blur-sm">
        <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          Transitions
        </h4>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <Input
            label="Event"
            value={newTransition.event}
            onChange={(e) => setNewTransition({ ...newTransition, event: e.target.value })}
            placeholder="Enter event name"
            className="bg-gray-900/60 border-amber-400/20"
          />

          <select
            value={newTransition.target}
            onChange={(e) => setNewTransition({ ...newTransition, target: e.target.value })}
            className="w-full rounded-lg bg-gray-900/60 border border-amber-400/20 px-3 py-2 text-amber-400"
          >
            <option value="">Select Target State</option>
            {availableStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={newTransition.guard}
            onChange={(e) => setNewTransition({ ...newTransition, guard: e.target.value })}
            className="w-full rounded-lg bg-gray-900/60 border border-amber-400/20 px-3 py-2 text-amber-400"
          >
            <option value="">Select Guard (Optional)</option>
            {guards.map((guard) => (
              <option key={guard.id} value={guard.name}>{guard.name}</option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleTransitionAdd}
          disabled={!newTransition.event || !newTransition.target}
          className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transition
        </Button>

        {/* Transitions List */}
        <div className="mt-4 space-y-2">
          {transitions.map((transition) => (
            <div
              key={transition.id}
              className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg border border-amber-400/10 group hover:border-amber-400/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">{transition.event}</span>
                <ArrowRight className="w-4 h-4 text-amber-400/60" />
                <span className="text-amber-400">{transition.target}</span>
                {transition.guard && (
                  <span className="px-2 py-1 text-xs bg-amber-400/10 rounded text-amber-400">
                    [{transition.guard}]
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guards Section */}
      <div className="bg-gray-800/60 p-6 rounded-xl border border-amber-400/30 backdrop-blur-sm">
        <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Guards
        </h4>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            label="Guard Name"
            value={newGuard.name}
            onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
            placeholder="Enter guard name"
            className="bg-gray-900/60 border-amber-400/20"
          />

          <Input
            label="Condition"
            value={newGuard.condition}
            onChange={(e) => setNewGuard({ ...newGuard, condition: e.target.value })}
            placeholder="Enter condition"
            className="bg-gray-900/60 border-amber-400/20"
          />
        </div>

        <Button
          onClick={handleGuardAdd}
          disabled={!newGuard.name || !newGuard.condition}
          className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Guard
        </Button>

        {/* Guards List */}
        <div className="mt-4 space-y-2">
          {guards.map((guard) => (
            <div
              key={guard.id}
              className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg border border-amber-400/10 group hover:border-amber-400/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-amber-400/60" />
                <span className="text-amber-400">{guard.name}</span>
                <span className="px-2 py-1 text-xs bg-amber-400/10 rounded text-amber-400">
                  {guard.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```