```tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/common/components/Button';

interface Alarm {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

interface AlarmListProps {
  alarms: Alarm[];
}

export const AlarmList: React.FC<AlarmListProps> = ({ alarms }) => {
  return (
    <div className="bg-gray-950/50 p-4 rounded-lg border border-yellow-400/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400">Active Alarms</span>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-yellow-400">{alarms.length}</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-auto">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`
              flex items-center justify-between p-2 rounded
              ${alarm.severity === 'high' ? 'bg-red-500/10 border-red-400/20' :
                alarm.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-400/20' :
                'bg-blue-500/10 border-blue-400/20'}
              border
            `}
          >
            <div>
              <p className={`
                text-sm font-medium
                ${alarm.severity === 'high' ? 'text-red-400' :
                  alarm.severity === 'medium' ? 'text-yellow-400' :
                  'text-blue-400'}
              `}>
                {alarm.message}
              </p>
              <span className="text-xs text-gray-400">{alarm.timestamp}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-gray-400 hover:text-gray-300"
            >
              Acknowledge
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
```