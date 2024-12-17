import { createMachine, assign } from 'xstate';

export interface TestContext {
  error?: string;
  stages: string[];
  currentStage: number;
}

export type TestEvent =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'RESET' }
  | { type: 'ERROR'; error: string }
  | { type: 'CHARGE' }
  | { type: 'DISCHARGE' }
  | { type: 'NEXT_STAGE' };

export const testMachine = createMachine({
  id: 'test',
  initial: 'idle',
  context: {
    error: undefined,
    stages: [],
    currentStage: 0,
  },
  states: {
    idle: {
      on: {
        START: {
          target: 'ready',
          actions: assign({
            error: undefined,
            currentStage: 0,
          }),
        },
      },
    },
    ready: {
      on: {
        CHARGE: 'charging',
        DISCHARGE: 'discharging',
        ERROR: {
          target: 'error',
          actions: assign({
            error: (_, event) => event.error,
          }),
        },
      },
    },
    charging: {
      on: {
        STOP: 'ready',
        ERROR: {
          target: 'error',
          actions: assign({
            error: (_, event) => event.error,
          }),
        },
        NEXT_STAGE: {
          actions: assign({
            currentStage: (context) => context.currentStage + 1,
          }),
        },
      },
    },
    discharging: {
      on: {
        STOP: 'ready',
        ERROR: {
          target: 'error',
          actions: assign({
            error: (_, event) => event.error,
          }),
        },
        NEXT_STAGE: {
          actions: assign({
            currentStage: (context) => context.currentStage + 1,
          }),
        },
      },
    },
    error: {
      on: {
        RESET: {
          target: 'ready',
          actions: assign({
            error: undefined,
            currentStage: 0,
          }),
        },
      },
    },
  },
} satisfies import('xstate').StateMachine<TestContext, TestEvent>);