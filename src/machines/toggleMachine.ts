import { createMachine, assign } from 'xstate';

export interface ToggleContext {
  count: number;
  maxCount?: number;
}

export type ToggleEvent = 
  | { type: 'TOGGLE' }
  | { type: 'RESET' };

export const toggleMachine = createMachine({
  id: 'toggle',
  context: {
    count: 0,
    maxCount: 10
  },
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
          guard: ({ context }) => 
            context.maxCount ? context.count < context.maxCount : true
        }
      }
    },
    active: {
      entry: assign({
        count: ({ context }) => context.count + 1
      }),
      on: {
        TOGGLE: 'inactive',
        RESET: {
          target: 'inactive',
          actions: assign({
            count: 0
          })
        }
      },
      after: {
        2000: 'inactive'
      }
    }
  }
});