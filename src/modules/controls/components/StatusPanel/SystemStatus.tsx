```tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useSystemStatus } from '../../hooks/useSystemStatus';

export const SystemStatus: React.FC = () => {
  const { cpuUsage, memoryUsage, diskSpace } = useSystemStatus();

  return (
    <div className="bg-gray-950/50 p-4 rounded-lg border border-yellow-400/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400">System Health</span>
        <CheckCircle className="w-5 h-5 text-green-400" />
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-400">CPU:</span>
          <span className="ml-2 text-yellow-400">{cpuUsage}%</span>
        </div>
        <div>
          <span className="text-gray-400">Memory:</span>
          <span className="ml-2 text-yellow-400">{memoryUsage}GB</span>
        </div>
        <div>
          <span className="text-gray-400">Disk:</span>
          <span className="ml-2 text-yellow-400">{diskSpace}GB</span>
        </div>
      </div>
    </div>
  );
};
```