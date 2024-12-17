import { useMemo } from 'react';
import { State } from '../types';

export function useCodePreview(states: State[]) {
  return useMemo(() => {
    const machineConfig = {
      id: 'stateMachine',
      initial: states.find(s => s.initial)?.name,
      states: states.reduce((acc, state) => ({
        ...acc,
        [state.name]: {
          type: state.type,
          transitions: state.transitions,
          guards: state.guards
        }
      }), {})
    };

    return {
      code: machineConfig,
      json: JSON.stringify(machineConfig, null, 2)
    };
  }, [states]);
}