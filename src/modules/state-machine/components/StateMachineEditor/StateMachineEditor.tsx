import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { StateForm } from './StateForm';
import { StateList } from './StateList';
import { StateTransitionEditor } from '../StateTransitionEditor';
import { CodePreview } from '../CodePreview';
import { State, StateType } from '../../types';
import { useStateMachine } from '../../hooks/useStateMachine';

export const StateMachineEditor: React.FC = () => {
  const { states, addState, updateState } = useStateMachine();
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  
  const [newState, setNewState] = useState({
    name: '',
    type: 'atomic' as StateType,
    initial: false
  });

  const handleAddState = () => {
    if (newState.name) {
      addState({
        name: newState.name,
        type: newState.type,
        initial: states.length === 0 || newState.initial
      });
      setNewState({ name: '', type: 'atomic', initial: false });
    }
  };

  const handleStateSelect = (id: string) => {
    setSelectedStateId(id === selectedStateId ? null : id);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-yellow-400">States</h3>
          <Button
            variant="outline"
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            {showCode ? 'Hide Code' : 'Show Code'}
          </Button>
        </div>

        <StateForm
          name={newState.name}
          type={newState.type}
          initial={newState.initial}
          onNameChange={(name) => setNewState({ ...newState, name })}
          onTypeChange={(type) => setNewState({ ...newState, type })}
          onInitialChange={(initial) => setNewState({ ...newState, initial })}
          onSubmit={handleAddState}
        />

        <StateList
          states={states}
          selectedStateId={selectedStateId}
          onStateSelect={handleStateSelect}
        />
      </div>

      {showCode && (
        <div className="sticky top-6">
          <CodePreview code={states} />
        </div>
      )}
    </div>
  );
};