import { Node, Edge } from 'reactflow';

export interface StageAction {
  id: string;
  type: 'command' | 'evaluation';
  command?: string;
  condition?: string;
  errorMessage?: string;
  timeout?: number;
}

export interface Stage {
  id: string;
  name: string;
  duration: number;
  description: string;
  actions: StageAction[];
  order: number;
}

export interface StageTransition {
  id: string;
  fromStageId: string;
  toStageId: string;
  condition?: string;
  duration: number;
  order: number;
}

export interface SimulationStep {
  fromState: string;
  toState: string;
  transitionId: string;
  duration: number;
  description: string;
  stages?: Stage[];
  stageTransitions?: StageTransition[];
}

export interface StateMachineConfig {
  nodes: Node[];
  edges: Edge[];
  simulationSteps: SimulationStep[];
}

export type StateMachineState = 'idle' | 'ready' | 'charge' | 'discharge' | 'error';

export interface StateData {
  label: string;
  stages?: Stage[];
}

export interface EdgeData {
  label: string;
  stageTransitions?: StageTransition[];
}