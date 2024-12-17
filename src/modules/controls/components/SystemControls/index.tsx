```tsx
import React from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { useSystemControls } from '../../hooks/useSystemControls';

export const SystemControls: React.FC = () => {
  const {
    systemState,
    isRunning,
    hasError,
    startSystem,
    stopSystem,
    resetSystem,
    acknowledgeError
  } = useSystemControls();

  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">System Controls</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Primary Controls */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={startSystem}
              disabled={isRunning || hasError}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 border-green-400/50"
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
            
            <Button
              onClick={stopSystem}
              disabled={!isRunning || hasError}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 border-red-400/50"
            >
              <Pause className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>

          <Button
            onClick={resetSystem}
            disabled={isRunning && !hasError}
            className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Status Display */}
        <div className="bg-gray-950/50 p-4 rounded-lg border border-yellow-400/10">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">State:</span>
              <span className="text-yellow-400 font-medium">{systemState}</span>
            </div>

            {hasError && (
              <div className="flex items-center justify-between">
                <span className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Error Detected
                </span>
                <Button
                  size="sm"
                  onClick={acknowledgeError}
                  className="text-red-400 hover:text-red-300"
                >
                  Acknowledge
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```