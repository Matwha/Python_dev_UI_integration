```typescript
import { useState, useEffect } from 'react';
import { useMQTTStore } from '@/core/store/mqttStore';

export function useSystemStatus() {
  const [status, setStatus] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskSpace: 0
  });

  const { subscribe, messages } = useMQTTStore();

  useEffect(() => {
    subscribe('system/status');
  }, [subscribe]);

  useEffect(() => {
    if (messages['system/status']) {
      setStatus(messages['system/status']);
    }
  }, [messages]);

  return status;
}
```