```tsx
import React from 'react';
import { Activity } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

interface DataMonitorProps {
  data: Record<string, DataPoint>;
}

export const DataMonitor: React.FC<DataMonitorProps> = ({ data }) => {
  return (
    <div className="bg-gray-950/50 p-4 rounded-lg border border-yellow-400/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400">Real-time Data</span>
        <Activity className="w-5 h-5 text-yellow-400" />
      </div>

      <div className="space-y-2">
        {Object.entries(data).map(([key, point]) => (
          <div
            key={key}
            className="flex items-center justify-between p-2 bg-black/20 rounded"
          >
            <div>
              <span className="text-sm text-yellow-400">{point.name}</span>
              <span className="text-xs text-gray-400 ml-2">
                {new Date(point.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <span className="text-sm font-medium text-yellow-400">
              {point.value} {point.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```