import React from 'react';
import { Button } from '../ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { SimulationStep } from '../../types/stateMachine';

interface SimulationControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  currentStep: number;
  simulationSteps: SimulationStep[];
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning,
  onStart,
  onStop,
  onReset,
  currentStep,
  simulationSteps,
}) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={onStart} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
          ) : (
            <Button onClick={onStop} className="bg-yellow-600 hover:bg-yellow-700">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        <div className="text-sm text-yellow-400">
          Step {currentStep + 1} of {simulationSteps.length}
        </div>
      </div>
      <div className="text-sm text-gray-400">
        {currentStep < simulationSteps.length && (
          <div>
            Current Transition:{' '}
            <span className="text-yellow-400">
              {simulationSteps[currentStep].description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};