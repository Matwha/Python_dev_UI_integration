```typescript
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transition, Guard } from '../types';

export function useTransitions() {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);

  const addTransition = (newTransition: Omit<Transition, 'id'>) => {
    setTransitions([
      ...transitions,
      {
        id: uuidv4(),
        ...newTransition
      }
    ]);
  };

  const addGuard = (newGuard: Omit<Guard, 'id'>) => {
    setGuards([
      ...guards,
      {
        id: uuidv4(),
        ...newGuard
      }
    ]);
  };

  const removeTransition = (id: string) => {
    setTransitions(transitions.filter(t => t.id !== id));
  };

  const removeGuard = (id: string) => {
    setGuards(guards.filter(g => g.id !== id));
  };

  return {
    transitions,
    guards,
    addTransition,
    addGuard,
    removeTransition,
    removeGuard
  };
}