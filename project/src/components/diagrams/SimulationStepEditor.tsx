import React, { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SimulationStep, StateMachineState } from '../../types/stateMachine';

interface SimulationStepEditorProps {
  steps: SimulationStep[];
  onStepsChange: (steps: SimulationStep[]) => void;
}

interface EditingStep {
  index: number | null;
  fromState: string;
  toState: string;
  description: string;
  duration: number;
}

export const SimulationStepEditor: React.FC<SimulationStepEditorProps> = ({
  steps,
  onStepsChange,
}) => {
  const [newStep, setNewStep] = useState<Partial<SimulationStep>>({
    duration: 1000,
  });

  const [editingStep, setEditingStep] = useState<EditingStep>({
    index: null,
    fromState: '',
    toState: '',
    description: '',
    duration: 1000,
  });

  const states: StateMachineState[] = ['idle', 'ready', 'charge', 'discharge', 'error'];

  const addStep = () => {
    if (
      newStep.fromState &&
      newStep.toState &&
      newStep.description &&
      newStep.duration
    ) {
      const transitionId = `${newStep.fromState}-${newStep.toState}`;
      onStepsChange([
        ...steps,
        {
          ...newStep as SimulationStep,
          transitionId,
        },
      ]);
      setNewStep({ duration: 1000 });
    }
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    onStepsChange(newSteps);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onStepsChange(newSteps);
  };

  const startEditing = (step: SimulationStep, index: number) => {
    setEditingStep({
      index,
      fromState: step.fromState,
      toState: step.toState,
      description: step.description,
      duration: step.duration,
    });
  };

  const cancelEditing = () => {
    setEditingStep({
      index: null,
      fromState: '',
      toState: '',
      description: '',
      duration: 1000,
    });
  };

  const saveEditing = () => {
    if (editingStep.index !== null) {
      const newSteps = [...steps];
      newSteps[editingStep.index] = {
        fromState: editingStep.fromState,
        toState: editingStep.toState,
        description: editingStep.description,
        duration: editingStep.duration,
        transitionId: `${editingStep.fromState}-${editingStep.toState}`,
      };
      onStepsChange(newSteps);
      cancelEditing();
    }
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Simulation Steps</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingStep.index === index ? (
              <div className="flex-1 grid grid-cols-4 gap-4">
                <select
                  className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                  value={editingStep.fromState}
                  onChange={(e) =>
                    setEditingStep({
                      ...editingStep,
                      fromState: e.target.value,
                    })
                  }
                >
                  <option value="">From State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select
                  className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                  value={editingStep.toState}
                  onChange={(e) =>
                    setEditingStep({
                      ...editingStep,
                      toState: e.target.value,
                    })
                  }
                >
                  <option value="">To State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <Input
                  type="number"
                  placeholder="Duration (ms)"
                  value={editingStep.duration}
                  onChange={(e) =>
                    setEditingStep({
                      ...editingStep,
                      duration: parseInt(e.target.value) || 1000,
                    })
                  }
                  min={100}
                  step={100}
                  className="bg-black/40 border-yellow-400/20"
                />

                <Input
                  placeholder="Description"
                  value={editingStep.description}
                  onChange={(e) =>
                    setEditingStep({
                      ...editingStep,
                      description: e.target.value,
                    })
                  }
                  className="bg-black/40 border-yellow-400/20"
                />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div className="text-sm">
                  <span className="text-gray-400">From:</span>{' '}
                  <span className="text-yellow-400">{step.fromState}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">To:</span>{' '}
                  <span className="text-yellow-400">{step.toState}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Duration:</span>{' '}
                  <span className="text-yellow-400">{step.duration}ms</span>
                </div>
                <div className="text-sm text-yellow-400">{step.description}</div>
              </div>
            )}
            <div className="flex gap-2">
              {editingStep.index === index ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={saveEditing}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditing}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === steps.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(step, index)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeStep(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newStep.fromState || ''}
          onChange={(e) =>
            setNewStep({ ...newStep, fromState: e.target.value as StateMachineState })
          }
        >
          <option value="">From State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newStep.toState || ''}
          onChange={(e) =>
            setNewStep({ ...newStep, toState: e.target.value as StateMachineState })
          }
        >
          <option value="">To State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Duration (ms)"
          value={newStep.duration}
          onChange={(e) =>
            setNewStep({ ...newStep, duration: parseInt(e.target.value) || 1000 })
          }
          min={100}
          step={100}
          className="bg-black/40 border-yellow-400/20"
        />

        <Input
          placeholder="Description"
          value={newStep.description || ''}
          onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
          className="bg-black/40 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addStep}
        disabled={
          !newStep.fromState ||
          !newStep.toState ||
          !newStep.description ||
          !newStep.duration
        }
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Step
      </Button>
    </div>
  );
};