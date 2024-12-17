import React, { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Node } from 'reactflow';
import { createStateNode } from '../../utils/stateMachineUtils';
import { StageEditor } from './StageEditor';
import { Stage, StateData } from '../../types/stateMachine';

interface StateEditorProps {
  nodes: Node<StateData>[];
  onNodesChange: (nodes: Node<StateData>[]) => void;
}

interface EditingState {
  id: string | null;
  name: string;
  x: number;
  y: number;
  isError: boolean;
  stages: Stage[];
}

export const StateEditor: React.FC<StateEditorProps> = ({ nodes, onNodesChange }) => {
  const [newState, setNewState] = useState({
    name: '',
    isError: false,
    x: 250,
    y: 250,
  });

  const [editingState, setEditingState] = useState<EditingState>({
    id: null,
    name: '',
    x: 0,
    y: 0,
    isError: false,
    stages: [],
  });

  const [expandedStates, setExpandedStates] = useState<string[]>([]);

  const toggleStateExpansion = (id: string) => {
    setExpandedStates(prev => 
      prev.includes(id) 
        ? prev.filter(stateId => stateId !== id)
        : [...prev, id]
    );
  };

  const addState = () => {
    if (newState.name) {
      const newNode = createStateNode(
        newState.name,
        newState.x,
        newState.y,
        newState.isError,
        []
      );
      onNodesChange([...nodes, newNode]);
      setNewState({ name: '', isError: false, x: 250, y: 250 });
    }
  };

  const removeState = (id: string) => {
    onNodesChange(nodes.filter(node => node.id !== id));
    setExpandedStates(prev => prev.filter(stateId => stateId !== id));
  };

  const startEditing = (node: Node<StateData>) => {
    setEditingState({
      id: node.id,
      name: node.data.label,
      x: node.position.x,
      y: node.position.y,
      isError: node.className?.includes('text-red-400') || false,
      stages: node.data.stages || [],
    });
  };

  const cancelEditing = () => {
    setEditingState({
      id: null,
      name: '',
      x: 0,
      y: 0,
      isError: false,
      stages: [],
    });
  };

  const saveEditing = () => {
    if (editingState.id) {
      onNodesChange(
        nodes.map(node =>
          node.id === editingState.id
            ? createStateNode(
                editingState.name,
                editingState.x,
                editingState.y,
                editingState.isError,
                editingState.stages
              )
            : node
        )
      );
      cancelEditing();
    }
  };

  const moveState = (index: number, direction: 'up' | 'down') => {
    const newNodes = [...nodes];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newNodes[index], newNodes[newIndex]] = [newNodes[newIndex], newNodes[index]];
    onNodesChange(newNodes);
  };

  const handleStagesChange = (nodeId: string, stages: Stage[]) => {
    onNodesChange(
      nodes.map(node =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                stages,
              },
            }
          : node
      )
    );
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">States</h3>

      <div className="space-y-4">
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className="space-y-4 bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingState.id === node.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <Input
                    placeholder="State Name"
                    value={editingState.name}
                    onChange={(e) =>
                      setEditingState({ ...editingState, name: e.target.value })
                    }
                    className="bg-black/40 border-yellow-400/20"
                  />
                  <Input
                    type="number"
                    placeholder="X Position"
                    value={editingState.x}
                    onChange={(e) =>
                      setEditingState({
                        ...editingState,
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-black/40 border-yellow-400/20"
                  />
                  <Input
                    type="number"
                    placeholder="Y Position"
                    value={editingState.y}
                    onChange={(e) =>
                      setEditingState({
                        ...editingState,
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-black/40 border-yellow-400/20"
                  />
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-yellow-400">
                      <input
                        type="checkbox"
                        checked={editingState.isError}
                        onChange={(e) =>
                          setEditingState({
                            ...editingState,
                            isError: e.target.checked,
                          })
                        }
                        className="rounded border-yellow-400/20"
                      />
                      Error State
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={saveEditing}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditing}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStateExpansion(node.id)}
                    className="p-1"
                  >
                    {expandedStates.includes(node.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  <span className={node.className}>{node.data.label}</span>
                  <div className="text-sm">
                    <span className="text-gray-400">Position:</span>{' '}
                    <span className="text-yellow-400">
                      ({node.position.x}, {node.position.y})
                    </span>
                  </div>
                  {node.data.stages && node.data.stages.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-400">Stages:</span>{' '}
                      <span className="text-yellow-400">
                        {node.data.stages.length}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveState(index, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveState(index, 'down')}
                    disabled={index === nodes.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(node)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeState(node.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {expandedStates.includes(node.id) && !editingState.id && (
              <div className="mt-4 pl-8">
                <StageEditor
                  stages={node.data.stages || []}
                  onStagesChange={(stages) => handleStagesChange(node.id, stages)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Input
          placeholder="State Name"
          value={newState.name}
          onChange={(e) => setNewState({ ...newState, name: e.target.value })}
          className="bg-black/40 border-yellow-400/20"
        />
        <Input
          type="number"
          placeholder="X Position"
          value={newState.x}
          onChange={(e) => setNewState({ ...newState, x: parseInt(e.target.value) || 0 })}
          className="bg-black/40 border-yellow-400/20"
        />
        <Input
          type="number"
          placeholder="Y Position"
          value={newState.y}
          onChange={(e) => setNewState({ ...newState, y: parseInt(e.target.value) || 0 })}
          className="bg-black/40 border-yellow-400/20"
        />
        <div className="flex items-center">
          <label className="flex items-center gap-2 text-yellow-400">
            <input
              type="checkbox"
              checked={newState.isError}
              onChange={(e) => setNewState({ ...newState, isError: e.target.checked })}
              className="rounded border-yellow-400/20"
            />
            Error State
          </label>
        </div>
      </div>

      <Button
        onClick={addState}
        disabled={!newState.name}
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add State
      </Button>
    </div>
  );
};