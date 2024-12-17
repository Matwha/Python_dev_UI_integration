import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transition, Guard } from '../types';

export function useTransitions() {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);

  const addTransition = useCallback((transition: Omit<Transition, 'id'>) => {
    setTransitions(prev => [...prev, { id: uuidv4(), ...transition }]);
  }, []);

  const removeTransition = useCallback((id: string) => {
    setTransitions(prev => prev.filter(t => t.id !== id));
  }, []);

  const addGuard = useCallback((guard: Omit<Guard, 'id'>) => {
    setGuards(prev => [...prev, { id: uuidv4(), ...guard }]);
  }, []);

  const removeGuard = useCallback((id: string) => {
    setGuards(prev => prev.filter(g => g.id !== id));
  }, []);

  return {
    transitions,
    guards,
    addTransition,
    removeTransition,
    addGuard,
    removeGuard
  };
}