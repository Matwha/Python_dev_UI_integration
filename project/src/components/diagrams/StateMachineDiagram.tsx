import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SimulationControls } from './SimulationControls';
import { SimulationStepEditor } from './SimulationStepEditor';
import { StateEditor } from './StateEditor';
import { TransitionEditor } from './TransitionEditor';
import { initialStateMachineConfig } from '../../utils/stateMachineConfig';
import { StateMachineState, SimulationStep, StateData, EdgeData } from '../../types/stateMachine';
import { Tabs } from '../ui/Tabs';

const EDITOR_TABS = [
  { id: 'states', label: 'States' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'simulation', label: 'Simulation' },
];

const defaultEdgeOptions = {
  type: 'default',
  style: { 
    stroke: '#FBBF24', 
    strokeWidth: 2,
  },
  labelStyle: { 
    fill: '#FBBF24', 
    fontWeight: 600,
    fontSize: 12,
    paintOrder: 'stroke',
    strokeWidth: 2,
    stroke: 'rgba(0, 0, 0, 0.5)',
  },
  labelBgStyle: { 
    fill: 'rgba(0, 0, 0, 0.7)',
    rx: 4,
    ry: 4,
  },
  labelBgPadding: [4, 4],
  labelBgBorderRadius: 4,
};

export const StateMachineDiagram: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialStateMachineConfig.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialStateMachineConfig.edges);
  const [currentState, setCurrentState] = useState<StateMachineState>('idle');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>(
    initialStateMachineConfig.simulationSteps
  );
  const [activeTab, setActiveTab] = useState('states');

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        ...defaultEdgeOptions,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const startSimulation = useCallback(() => {
    if (simulationSteps.length === 0) return;
    
    setIsSimulationRunning(true);
    const interval = setInterval(() => {
      setCurrentStep((step) => {
        if (step >= simulationSteps.length - 1) {
          setIsSimulationRunning(false);
          clearInterval(interval);
          return 0;
        }
        return step + 1;
      });
    }, simulationSteps[currentStep].duration);
    setSimulationInterval(interval);
  }, [currentStep, simulationSteps]);

  const stopSimulation = useCallback(() => {
    setIsSimulationRunning(false);
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
  }, [simulationInterval]);

  const resetSimulation = useCallback(() => {
    stopSimulation();
    setCurrentStep(0);
    setCurrentState('idle');
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: false,
      }))
    );
  }, [stopSimulation, setEdges]);

  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);

  useEffect(() => {
    if (!isSimulationRunning || simulationSteps.length === 0) return;

    const currentSimStep = simulationSteps[currentStep];
    setCurrentState(currentSimStep.toState as StateMachineState);
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: edge.id === currentSimStep.transitionId,
        style: {
          ...defaultEdgeOptions.style,
          stroke: edge.id === currentSimStep.transitionId ? '#10B981' : '#FBBF24',
        },
      }))
    );
  }, [currentStep, isSimulationRunning, simulationSteps, setEdges]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        className: `bg-gray-900/90 ${
          node.id === 'error' ? 'text-red-400 border-2' : 'text-yellow-400 border-2'
        } ${
          node.id === currentState
            ? node.id === 'error'
              ? 'border-red-400 shadow-lg shadow-red-400/50'
              : 'border-green-400 shadow-lg shadow-green-400/50'
            : node.id === 'error'
            ? 'border-red-400'
            : 'border-yellow-400'
        } rounded-md font-semibold`,
      }))
    );
  }, [currentState, setNodes]);

  return (
    <div className="space-y-4">
      {activeTab === 'simulation' && (
        <SimulationControls
          isRunning={isSimulationRunning}
          onStart={startSimulation}
          onStop={stopSimulation}
          onReset={resetSimulation}
          currentStep={currentStep}
          simulationSteps={simulationSteps}
        />
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[600px] bg-gray-900 rounded-lg border border-yellow-400/20">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            className="bg-black/50"
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <div className="space-y-4">
          <Tabs tabs={EDITOR_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          
          {activeTab === 'states' && (
            <StateEditor
              nodes={nodes as Node<StateData>[]}
              onNodesChange={setNodes}
            />
          )}
          
          {activeTab === 'transitions' && (
            <TransitionEditor
              nodes={nodes as Node<StateData>[]}
              edges={edges as Edge<EdgeData>[]}
              onEdgesChange={setEdges}
            />
          )}
          
          {activeTab === 'simulation' && (
            <SimulationStepEditor
              steps={simulationSteps}
              onStepsChange={setSimulationSteps}
            />
          )}
        </div>
      </div>
    </div>
  );
};