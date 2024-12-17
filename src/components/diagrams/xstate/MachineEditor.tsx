import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Settings, Code } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface StateConfig {
  id: string;
  name: string;
  type: 'atomic' | 'compound' | 'parallel' | 'final';
  initial: boolean;
  entryActions: string[];
  exitActions: string[];
  transitions: Array<{
    event: string;
    target: string;
    guard?: string;
  }>;
  guards: Array<{
    name: string;
    condition: string;
  }>;
}

interface MachineEditorProps {
  onMachineUpdate: (machine: any) => void;
}

export const MachineEditor: React.FC<MachineEditorProps> = ({ onMachineUpdate }) => {
  const [states, setStates] = useState<StateConfig[]>([]);
  const [expandedStates, setExpandedStates] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [newState, setNewState] = useState({
    name: '',
    type: 'atomic' as const,
    initial: false
  });

  const toggleStateExpansion = (stateId: string) => {
    setExpandedStates(prev =>
      prev.includes(stateId) ? prev.filter(id => id !== stateId) : [...prev, stateId]
    );
  };

  const addState = () => {
    if (newState.name) {
      const stateId = crypto.randomUUID();
      setStates([...states, {
        id: stateId,
        name: newState.name,
        type: newState.type,
        initial: states.length === 0 || newState.initial,
        entryActions: [],
        exitActions: [],
        transitions: [],
        guards: []
      }]);
      setNewState({ name: '', type: 'atomic', initial: false });
    }
  };

  const handleStateSettings = (stateId: string) => {
    setSelectedStateId(stateId === selectedStateId ? null : stateId);
    if (!expandedStates.includes(stateId)) {
      setExpandedStates([...expandedStates, stateId]);
    }
  };

  const updateStateConfig = (stateId: string, updates: Partial<StateConfig>) => {
    setStates(states.map(state =>
      state.id === stateId ? { ...state, ...updates } : state
    ));
  };

  const addTransition = (stateId: string, transition: { event: string; target: string; guard?: string }) => {
    updateStateConfig(stateId, {
      transitions: [...states.find(s => s.id === stateId)!.transitions, transition]
    });
  };

  const addGuard = (stateId: string, guard: { name: string; condition: string }) => {
    updateStateConfig(stateId, {
      guards: [...states.find(s => s.id === stateId)!.guards, guard]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-yellow-400">Machine Configuration</h3>
        <Button
          variant="outline"
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2"
        >
          <Code className="w-4 h-4" />
          {showCode ? 'Hide Code' : 'Show Code'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* State Configuration Section */}
          <div className="bg-gray-900/95 p-6 rounded-lg border border-yellow-400/20">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="State Name"
                value={newState.name}
                onChange={(e) => setNewState({ ...newState, name: e.target.value })}
                placeholder="Enter state name"
                className="bg-gray-950"
              />
              
              <Select
                label="State Type"
                value={newState.type}
                onChange={(e) => setNewState({ ...newState, type: e.target.value as StateConfig['type'] })}
                className="bg-gray-950"
              >
                <option value="atomic">Atomic</option>
                <option value="compound">Compound</option>
                <option value="parallel">Parallel</option>
                <option value="final">Final</option>
              </Select>
            </div>

            <div className="flex items-center gap-4 mb-4">
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
              onClick={addState}
              disabled={!newState.name}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add State
            </Button>
          </div>

          {/* State List */}
          <div className="space-y-2">
            {states.map((state) => (
              <div
                key={state.id}
                className="bg-gray-900/95 rounded-lg border border-yellow-400/20 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStateExpansion(state.id)}
                      className="p-1 hover:bg-yellow-400/10 rounded"
                    >
                      {expandedStates.includes(state.id) ? (
                        <ChevronUp className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-yellow-400" />
                      )}
                    </button>
                    <span className="text-yellow-400 font-medium">{state.name}</span>
                    <div className="flex gap-2">
                      {state.initial && (
                        <span className="px-2 py-0.5 text-xs bg-green-400/10 text-green-400 rounded">
                          Initial
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-xs bg-yellow-400/10 text-yellow-400 rounded">
                        {state.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStateSettings(state.id)}
                    className={`hover:bg-yellow-400/10 ${
                      selectedStateId === state.id ? 'bg-yellow-400/10' : ''
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                {expandedStates.includes(state.id) && (
                  <div className="p-4 border-t border-yellow-400/20 bg-black/40">
                    <div className="space-y-4">
                      {/* Entry/Exit Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Entry Action"
                          placeholder="Action name"
                          value={state.entryActions[0] || ''}
                          onChange={(e) => updateStateConfig(state.id, {
                            entryActions: [e.target.value]
                          })}
                          className="bg-gray-950"
                          disabled={selectedStateId !== state.id}
                        />
                        <Input
                          label="Exit Action"
                          placeholder="Action name"
                          value={state.exitActions[0] || ''}
                          onChange={(e) => updateStateConfig(state.id, {
                            exitActions: [e.target.value]
                          })}
                          className="bg-gray-950"
                          disabled={selectedStateId !== state.id}
                        />
                      </div>
                      
                      {/* Transitions */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-yellow-400">Transitions</h4>
                        {state.transitions.map((transition, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-black/20 rounded">
                            <span className="text-yellow-400">{transition.event}</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-yellow-400">{transition.target}</span>
                            {transition.guard && (
                              <span className="text-sm text-gray-400">[{transition.guard}]</span>
                            )}
                          </div>
                        ))}
                        {selectedStateId === state.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addTransition(state.id, {
                              event: 'EVENT',
                              target: 'TARGET'
                            })}
                            className="w-full mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Transition
                          </Button>
                        )}
                      </div>

                      {/* Guards */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-yellow-400">Guards</h4>
                        {state.guards.map((guard, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-black/20 rounded">
                            <span className="text-yellow-400">{guard.name}</span>
                            <span className="text-gray-400">{guard.condition}</span>
                          </div>
                        ))}
                        {selectedStateId === state.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addGuard(state.id, {
                              name: 'GUARD',
                              condition: 'condition'
                            })}
                            className="w-full mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Guard
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/95 p-6 rounded-lg border border-yellow-400/20">
            <pre className="text-sm text-yellow-400 font-mono whitespace-pre-wrap">
              {JSON.stringify({
                id: 'stateMachine',
                initial: states.find(s => s.initial)?.name,
                states: states.reduce((acc, state) => ({
                  ...acc,
                  [state.name]: {
                    type: state.type,
                    ...(state.entryActions.length && { entry: state.entryActions }),
                    ...(state.exitActions.length && { exit: state.exitActions }),
                    ...(state.transitions.length && {
                      on: state.transitions.reduce((acc, t) => ({
                        ...acc,
                        [t.event]: {
                          target: t.target,
                          ...(t.guard && { guard: t.guard })
                        }
                      }), {})
                    })
                  }
                }), {})
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};