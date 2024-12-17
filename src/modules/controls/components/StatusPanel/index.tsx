```tsx
import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { SystemStatus } from './SystemStatus';
import { AlarmList } from './AlarmList';
import { DataMonitor } from './DataMonitor';

interface StatusPanelProps {
  messages: Record<string, any>;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ messages }) => {
  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20 h-full">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">System Status</h3>

      <div className="space-y-6">
        <SystemStatus />
        <AlarmList alarms={messages.alarms || []} />
        <DataMonitor data={messages.data || {}} />
      </div>
    </div>
  );
};
```