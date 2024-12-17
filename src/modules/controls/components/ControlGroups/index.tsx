```tsx
import React from 'react';
import { Settings } from 'lucide-react';
import { ControlGroup } from './ControlGroup';
import { useControlGroups } from '../../hooks/useControlGroups';

export const ControlGroups: React.FC = () => {
  const { groups } = useControlGroups();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-yellow-400">Control Groups</h3>
        <Settings className="w-5 h-5 text-yellow-400/60" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {groups.map((group) => (
          <ControlGroup
            key={group.id}
            name={group.name}
            controls={group.controls}
          />
        ))}
      </div>
    </div>
  );
};
```