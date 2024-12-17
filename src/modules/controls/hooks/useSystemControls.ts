```typescript
import { useState, useCallback } from 'react';
import { useMQTTStore } from '@/core/store/mqttStore';

export function useSystemControls() {
  const [systemState, setSystemState] = useState('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { publish } = useMQTTStore();

  const startSystem = useCallback(() => {
    publish('system/control', { command: 'start' });
    setSystemState('running');
    setIsRunning(true);
  }, [publish]);

  const stopSystem = useCallback(() => {
    publish('system/control', { command: 'stop' });
    setSystemState('stopped');
    setIsRunning(false);
  }, [publish]);

  const resetSystem = useCallback(() => {
    publish('system/control', { command: 'reset' });
    setSystemState('idle');
    setIsRunning(false);
    setHasError(false);
  }, [publish]);

  const acknowledgeError = useCallback(() => {
    publish('system/control', { command: 'acknowledge' });
    setHasError(false);
  }, [publish]);

  return {
    systemState,
    isRunning,
    hasError,
    startSystem,
    stopSystem,
    resetSystem,
    acknowledgeError
  };
}
```