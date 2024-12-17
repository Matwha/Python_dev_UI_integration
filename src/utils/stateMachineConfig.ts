import { Node, Edge } from 'reactflow';
import { StateMachineConfig } from '../types/stateMachine';

export const initialNodes: Node[] = [
  {
    id: 'idle',
    type: 'default',
    data: { label: 'Idle' },
    position: { x: 250, y: 100 },
    className: 'bg-gray-900 text-yellow-400 border-2 border-yellow-400 rounded-md',
  },
  {
    id: 'ready',
    type: 'default',
    data: { label: 'Ready' },
    position: { x: 250, y: 250 },
    className: 'bg-gray-900 text-yellow-400 border-2 border-yellow-400 rounded-md',
  },
  {
    id: 'charge',
    type: 'default',
    data: { label: 'Charge' },
    position: { x: 100, y: 400 },
    className: 'bg-gray-900 text-yellow-400 border-2 border-yellow-400 rounded-md',
  },
  {
    id: 'discharge',
    type: 'default',
    data: { label: 'Discharge' },
    position: { x: 400, y: 400 },
    className: 'bg-gray-900 text-yellow-400 border-2 border-yellow-400 rounded-md',
  },
  {
    id: 'error',
    type: 'default',
    data: { label: 'Error' },
    position: { x: 500, y: 250 },
    className: 'bg-gray-900 text-red-400 border-2 border-red-400 rounded-md',
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'idle-ready',
    source: 'idle',
    target: 'ready',
    label: 'BMS Data Detected',
    animated: false,
    className: 'text-yellow-400',
  },
  {
    id: 'ready-charge',
    source: 'ready',
    target: 'charge',
    label: 'Start Button',
    animated: false,
    className: 'text-yellow-400',
  },
  {
    id: 'charge-ready',
    source: 'charge',
    target: 'ready',
    label: 'Stop Button',
    animated: false,
    className: 'text-yellow-400',
  },
  {
    id: 'ready-discharge',
    source: 'ready',
    target: 'discharge',
    label: 'Discharge Button',
    animated: false,
    className: 'text-yellow-400',
  },
  {
    id: 'discharge-ready',
    source: 'discharge',
    target: 'ready',
    label: 'Stop Button',
    animated: false,
    className: 'text-yellow-400',
  },
  {
    id: 'charge-error',
    source: 'charge',
    target: 'error',
    label: 'Error Detected',
    animated: false,
    className: 'text-red-400',
  },
  {
    id: 'discharge-error',
    source: 'discharge',
    target: 'error',
    label: 'Error Detected',
    animated: false,
    className: 'text-red-400',
  },
  {
    id: 'error-ready',
    source: 'error',
    target: 'ready',
    label: 'Reset',
    animated: false,
    className: 'text-yellow-400',
  },
];

export const defaultSimulationSteps = [
  {
    fromState: 'idle',
    toState: 'ready',
    transitionId: 'idle-ready',
    duration: 1000,
    description: 'BMS Data Detected - System Ready',
  },
  {
    fromState: 'ready',
    toState: 'charge',
    transitionId: 'ready-charge',
    duration: 1000,
    description: 'Start Button Pressed - Charging',
  },
  {
    fromState: 'charge',
    toState: 'error',
    transitionId: 'charge-error',
    duration: 1000,
    description: 'Error Detected During Charging',
  },
  {
    fromState: 'error',
    toState: 'ready',
    transitionId: 'error-ready',
    duration: 1000,
    description: 'System Reset - Ready State',
  },
  {
    fromState: 'ready',
    toState: 'discharge',
    transitionId: 'ready-discharge',
    duration: 1000,
    description: 'Discharge Button Pressed',
  },
  {
    fromState: 'discharge',
    toState: 'ready',
    transitionId: 'discharge-ready',
    duration: 1000,
    description: 'Stop Button Pressed - Ready State',
  },
];

export const initialStateMachineConfig: StateMachineConfig = {
  nodes: initialNodes,
  edges: initialEdges,
  simulationSteps: defaultSimulationSteps,
};