```tsx
import React from 'react';
import { SystemControls } from '../SystemControls';
import { ControlGroups } from '../ControlGroups';
import { StatusPanel } from '../StatusPanel';
import { useMQTTStore } from '@/core/store/mqttStore';

export const ControlPanel: React.FC = () => {
  const { connected, messages } = useMQTTStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-400">System Controls</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Status:</span>
          <span className={`text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Controls */}
        <div className="col-span-8 space-y-6">
          <SystemControls />
          <ControlGroups />
        </div>

        {/* Status Panel */}
        <div className="col-span-4">
          <StatusPanel messages={messages} />
        </div>
      </div>
    </div>
  );
};
```