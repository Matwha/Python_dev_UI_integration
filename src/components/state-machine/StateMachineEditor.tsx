```tsx
import React, { useState } from 'react';
import { Code, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { StateTransitionEditor } from './StateTransitionEditor';
import { CodePreview } from './CodePreview';

interface State {
  id: string;
  name: string;
  type: 'atomic' | 'compound' | 'parallel' | 'final';
  initial: boolean;
  transitions: Array<{
    id: string;
    event: string;
    target: string;
    guard?: string;
  }>;
  guards: Array<{
    id: string;
    name: string;
    condition: string;
  }>;
}

interface StateMachineEditorProps {
  onUpdate: (machine: any) => void;
}

export const StateMachineEditor: React.FC<StateMachineEditorProps> = ({ onUpdate }) => {
  const [states, setStates] = useState<State[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  
  // New state form
  const [newState, setNewState] = useState({
    name: '',
    type: 'atomic' as const,
    initial: false
  });

  const handleAddState = () => {
    if (newState.name) {
      const state: State = {
        id: crypto.randomUUID(),
        name: newState.name,
        type: newState.type,
        initial: states.length === 0 || newState.initial,
        transitions: [],
        guards: []
      };
      
      setStates([...states, state]);
      setNewState({ name: '', type: 'atomic', initial: false });
    }
  };

  const handleTransitionsChange = (stateId: string, transitions: any[]) => {
    setStates(states.map(state => 
      state.id === stateId 
        ? { ...state, transitions }
        : state
    ));
  };

  const handleGuardsChange = (stateId: string, guards: any[]) => {
    setStates(states.map(state => 
      state.id === stateId 
        ? { ...state, guards }
        : state
    ));
  };

  const generateMachineCode = () => {
    return {
      id: 'stateMachine',
      initial: states.find(s => s.initial)?.name,
      states: states.reduce((acc, state) => ({
        ...acc,
        [state.name]: {
          type: state.type,
          transitions: state.transitions,
          guards: state.guards
        }
      }), {})
    };
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* State Configuration */}
        <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20 space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="State Name"
              value={newState.name}
              onChange={(e) => setNewState({ ...newState, name: e.target.value })}
              placeholder="Enter state name"
              className="bg-gray-950 border-yellow-400/30"
            />
            
            <Select
              label="State Type"
              value={newState.type}
              onChange={(e) => setNewState({ ...newState, type: e.target.value as State['type'] })}
              className="bg-gray-950 border-yellow-400/30"
            >
              <option value="atomic">Atomic</option>
              <option value="compound">Compound</option>
              <option value="parallel">Parallel</option>
              <option value="final">Final</option>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-yellow-400">
              <input
                type="checkbox"
                checked={newState.initial}
                onChange={(e) => setNewState({ ...newState, initial: e.target.checked })}
                className="rounded border-yellow-400/20 bg-gray-950"
              />
              Initial State
            </label>
          </div>

          <Button
            onClick={handleAddState}
            disabled={!newState.name}
            className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add State
          </Button>
        </div>

        {/* State List */}
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
                  onClick={() => setSelectedStateId(state.id === selectedStateId ? null : state.id)}
                  className="hover:bg-yellow-400/10"
                >
                  {state.id === selectedStateId ? 'Close' : 'Edit'}
                </Button>
              </div>

              {state.id === selectedStateId && (
                <StateTransitionEditor
                  stateName={state.name}
                  availableStates={states.filter(s => s.id !== state.id).map(s => s.name)}
                  onTransitionsChange={(transitions) => handleTransitionsChange(state.id, transitions)}
                  onGuardsChange={(guards) => handleGuardsChange(state.id, guards)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Preview */}
      {showCode && (
        <div className="sticky top-6">
          <CodePreview code={generateMachineCode()} />
        </div>
      )}
    </div>
  );
};
```