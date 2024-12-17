import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { State, StateType } from '../types';

interface NewState {
  name: string;
  type: StateType;
  initial: boolean;
}

export function useStateMachine() {
  const [states, setStates] = useState<State[]>([]);

  const addState = (newState: NewState) => {
    const state: State = {
      id: uuidv4(),
      name: newState.name,
      type: newState.type,
      initial: newState.initial,
      transitions: [],
      guards: []
    };
    
    setStates([...states, state]);
  };

  const updateState = (id: string, updates: Partial<State>) => {
    setStates(states.map(state => 
      state.id === id ? { ...state, ...updates } : state
    ));
  };

  const removeState = (id: string) => {
    setStates(states.filter(state => state.id !== id));
  };

  return {
    states,
    addState,
    updateState,
    removeState
  };
}