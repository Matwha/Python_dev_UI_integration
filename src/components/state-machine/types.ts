```typescript
export interface Transition {
  id: string;
  event: string;
  target: string;
  guard?: string;
}

export interface Guard {
  id: string;
  name: string;
  condition: string;
}

export interface State {
  id: string;
  name: string;
  type: 'atomic' | 'compound' | 'parallel' | 'final';
  initial: boolean;
  transitions: Transition[];
  guards: Guard[];
}

export interface StateMachine {
  id: string;
  initial: string;
  states: Record<string, {
    type: State['type'];
    transitions: Transition[];
    guards: Guard[];
  }>;
}
```