```tsx
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Play, Pause, RotateCcw } from 'lucide-react';

interface SimulationStep {
  fromState: string;
  toState: string;
  event: string;
  duration: number;
}

interface SimulationConfigProps {
  states: Record<string, any>;
  onSimulate: (steps: SimulationStep[]) => void;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const SimulationConfig: React.FC<SimulationConfigProps> = ({
  states,
  onSimulate,
  isRunning,
  onStart,
  onStop,
  onReset,
}) => {
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [newStep, setNewStep] = useState<Partial<SimulationStep>>({
    duration: 1000,
  });

  const addStep = () => {
    if (newStep.fromState && newStep.toState && newStep.event) {
      const updatedSteps = [
        ...steps,
        {
          fromState: newStep.fromState,
          toState: newStep.toState,
          event: newStep.event,
          duration: newStep.duration || 1000,
        },
      ];
      setSteps(updatedSteps);
      onSimulate(updatedSteps);
      setNewStep({ duration: 1000 });
    }
  };

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
    onSimulate(updatedSteps);
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-yellow-400">Simulation</h3>
        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={onStart} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={onStop} className="bg-yellow-600 hover:bg-yellow-700">
              <Pause className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-400">{step.fromState}</span>
              <span className="text-gray-400">→</span>
              <span className="text-yellow-400">{step.toState}</span>
              <span className="text-gray-400">({step.event})</span>
              <span className="text-sm text-gray-400">{step.duration}ms</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeStep(index)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newStep.fromState || ''}
          onChange={(e) =>
            setNewStep({ ...newStep, fromState: e.target.value })
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
          value={newStep.toState || ''}
          onChange={(e) =>
            setNewStep({ ...newStep, toState: e.target.value })
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
          placeholder="Event"
          value={newStep.event || ''}
          onChange={(e) => setNewStep({ ...newStep, event: e.target.value })}
          className="bg-black/40 border-yellow-400/20"
        />

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
      </div>

      <Button
        onClick={addStep}
        disabled={!newStep.fromState || !newStep.toState || !newStep.event}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Step
      </Button>
    </div>
  );
};
```