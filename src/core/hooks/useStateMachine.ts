import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { State, Transition, Guard } from '../types';

export function useStateMachine() {
  const [states, setStates] = useState<State[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  const addState = useCallback((state: Omit<State, 'id'>) => {
    const newState: State = {
      id: uuidv4(),
      ...state,
      transitions: [],
      guards: []
    };
    setStates(prev => [...prev, newState]);
  }, []);

  const updateState = useCallback((id: string, updates: Partial<State>) => {
    setStates(prev => prev.map(state => 
      state.id === id ? { ...state, ...updates } : state
    ));
  }, []);

  const removeState = useCallback((id: string) => {
    setStates(prev => prev.filter(state => state.id !== id));
  }, []);

  const addTransition = useCallback((stateId: string, transition: Omit<Transition, 'id'>) => {
    setStates(prev => prev.map(state => 
      state.id === stateId 
        ? {
            ...state,
            transitions: [...state.transitions, { id: uuidv4(), ...transition }]
          }
        : state
    ));
  }, []);

  const addGuard = useCallback((stateId: string, guard: Omit<Guard, 'id'>) => {
    setStates(prev => prev.map(state => 
      state.id === stateId 
        ? {
            ...state,
            guards: [...state.guards, { id: uuidv4(), ...guard }]
          }
        : state
    ));
  }, []);

  return {
    states,
    selectedStateId,
    setSelectedStateId,
    addState,
    updateState,
    removeState,
    addTransition,
    addGuard
  };
}