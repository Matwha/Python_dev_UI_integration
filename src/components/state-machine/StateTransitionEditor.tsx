```tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TransitionForm } from './transitions/TransitionForm';
import { TransitionList } from './transitions/TransitionList';
import { GuardForm } from './guards/GuardForm';
import { GuardList } from './guards/GuardList';

interface Transition {
  id: string;
  event: string;
  target: string;
  guard?: string;
}

interface Guard {
  id: string;
  name: string;
  condition: string;
}

interface StateTransitionEditorProps {
  stateName: string;
  availableStates: string[];
  onTransitionsChange: (transitions: Transition[]) => void;
  onGuardsChange: (guards: Guard[]) => void;
}

export const StateTransitionEditor: React.FC<StateTransitionEditorProps> = ({
  stateName,
  availableStates,
  onTransitionsChange,
  onGuardsChange
}) => {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);
  
  // Transition form state
  const [eventName, setEventName] = useState('');
  const [targetState, setTargetState] = useState('');
  
  // Guard form state
  const [guardName, setGuardName] = useState('');
  const [guardCondition, setGuardCondition] = useState('');

  const handleAddTransition = () => {
    const newTransition: Transition = {
      id: uuidv4(),
      event: eventName,
      target: targetState
    };
    
    const updatedTransitions = [...transitions, newTransition];
    setTransitions(updatedTransitions);
    onTransitionsChange(updatedTransitions);
    
    // Reset form
    setEventName('');
    setTargetState('');
  };

  const handleAddGuard = () => {
    const newGuard: Guard = {
      id: uuidv4(),
      name: guardName,
      condition: guardCondition
    };
    
    const updatedGuards = [...guards, newGuard];
    setGuards(updatedGuards);
    onGuardsChange(updatedGuards);
    
    // Reset form
    setGuardName('');
    setGuardCondition('');
  };

  const handleDeleteTransition = (id: string) => {
    const updatedTransitions = transitions.filter(t => t.id !== id);
    setTransitions(updatedTransitions);
    onTransitionsChange(updatedTransitions);
  };

  const handleDeleteGuard = (id: string) => {
    const updatedGuards = guards.filter(g => g.id !== id);
    setGuards(updatedGuards);
    onGuardsChange(updatedGuards);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-amber-400">
          Transitions for {stateName}
        </h3>
        
        <TransitionForm
          eventName={eventName}
          targetState={targetState}
          availableStates={availableStates}
          onEventNameChange={setEventName}
          onTargetStateChange={setTargetState}
          onSubmit={handleAddTransition}
        />
        
        <TransitionList
          transitions={transitions}
          onDelete={handleDeleteTransition}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-amber-400">
          Guards
        </h3>
        
        <GuardForm
          name={guardName}
          condition={guardCondition}
          onNameChange={setGuardName}
          onConditionChange={setGuardCondition}
          onSubmit={handleAddGuard}
        />
        
        <GuardList
          guards={guards}
          onDelete={handleDeleteGuard}
        />
      </div>
    </div>
  );
};
```