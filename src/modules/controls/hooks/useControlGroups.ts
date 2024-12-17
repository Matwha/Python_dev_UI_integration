```typescript
import { useState } from 'react';
import { ControlGroup } from '../types';
import { useMQTTStore } from '@/core/store/mqttStore';

export function useControlGroups() {
  const { publish } = useMQTTStore();
  const [groups] = useState<ControlGroup[]>([
    {
      id: '1',
      name: 'Power Controls',
      controls: [
        {
          id: 'power-on',
          name: 'Power On',
          type: 'button',
          config: {},
          action: () => publish('power/control', { command: 'on' })
        },
        {
          id: 'power-off',
          name: 'Power Off',
          type: 'button',
          config: {},
          action: () => publish('power/control', { command: 'off' })
        }
      ]
    },
    {
      id: '2',
      name: 'Test Controls',
      controls: [
        {
          id: 'test-enable',
          name: 'Enable Testing',
          type: 'switch',
          config: { defaultChecked: false },
          action: (enabled: boolean) => publish('test/control', { enabled })
        },
        {
          id: 'test-level',
          name: 'Test Level',
          type: 'slider',
          config: { min: 0, max: 100, step: 1 },
          action: (value: number) => publish('test/level', { value })
        }
      ]
    }
  ]);

  return { groups };
}
```