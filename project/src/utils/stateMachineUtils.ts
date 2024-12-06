import { Edge, Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { Stage, StateData, StageTransition, EdgeData, StageAction } from '../types/stateMachine';

export const generateTransitionId = (source: string, target: string): string => {
  return `${source}-${target}-${uuidv4().slice(0, 8)}`;
};

export const createTransitionEdge = (
  source: string,
  target: string,
  label: string,
  isError: boolean,
  stageTransitions: StageTransition[] = []
): Edge<EdgeData> => {
  // Sort stage transitions by order
  const sortedTransitions = [...stageTransitions].sort((a, b) => a.order - b.order);
  
  return {
    id: generateTransitionId(source, target),
    source,
    target,
    data: {
      label,
      stageTransitions: sortedTransitions
    },
    label,
    animated: false,
    className: isError ? 'text-red-400' : 'text-yellow-400',
  };
};

export const createStateNode = (
  name: string,
  x: number,
  y: number,
  isError: boolean,
  stages: Stage[] = []
): Node<StateData> => {
  // Sort stages by order
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  return {
    id: name.toLowerCase(),
    type: 'default',
    data: { 
      label: name,
      stages: sortedStages
    },
    position: { x, y },
    className: `bg-gray-900 ${
      isError ? 'text-red-400 border-2 border-red-400' : 'text-yellow-400 border-2 border-yellow-400'
    } rounded-md`,
  };
};

export const createStage = (
  name: string,
  duration: number,
  description: string,
  actions: StageAction[] = [],
  order: number
): Stage => {
  return {
    id: uuidv4(),
    name,
    duration,
    description,
    actions,
    order
  };
};

export const createStageAction = (
  type: 'command' | 'evaluation',
  params: {
    command?: string;
    condition?: string;
    errorMessage?: string;
    timeout?: number;
  } = {}
): StageAction => {
  return {
    id: uuidv4(),
    type,
    ...params
  };
};

export const createStageTransition = (
  fromStageId: string,
  toStageId: string,
  condition: string = '',
  duration: number = 1000,
  order: number
): StageTransition => {
  return {
    id: uuidv4(),
    fromStageId,
    toStageId,
    condition,
    duration,
    order
  };
};

export const getNextAvailableOrder = (items: Array<{ order: number }>) => {
  if (items.length === 0) return 0;
  return Math.max(...items.map(item => item.order)) + 1;
};