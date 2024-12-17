```tsx
import React from 'react';
import { TransitionEditor } from './TransitionEditor';
import { GuardEditor } from './GuardEditor';
import { State, Transition, Guard } from '../../types';
import { useTransitions } from '../../hooks/useTransitions';

interface StateEditorProps {
  state: State;
  availableStates: string[];
  onStateUpdate: (updates: Partial<State>) => void;
}

export const StateEditor: React.FC<StateEditorProps> = ({
  state,
  availableStates,
  onStateUpdate
}) => {
  const {
    transitions,
    guards,
    addTransition,
    addGuard,
    removeTransition,
    removeGuard
  } = useTransitions();

  const handleTransitionAdd = (transition: Omit<Transition, 'id'>) => {
    addTransition(transition);
    onStateUpdate({
      transitions: [...transitions, transition as Transition]
    });
  };

  const handleGuardAdd = (guard: Omit<Guard, 'id'>) => {
    addGuard(guard);
    onStateUpdate({
      guards: [...guards, guard as Guard]
    });
  };

  return (
    <div className="space-y-6">
      <TransitionEditor
        stateId={state.id}
        availableStates={availableStates}
        transitions={transitions}
        guards={guards}
        onTransitionAdd={handleTransitionAdd}
        onGuardAdd={handleGuardAdd}
      />
      
      <GuardEditor
        guards={guards}
        onGuardAdd={handleGuardAdd}
        onGuardRemove={removeGuard}
      />
    </div>
  );
};
```