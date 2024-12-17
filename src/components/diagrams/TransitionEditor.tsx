import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Edge, Node } from 'reactflow';
import { createTransitionEdge } from '../../utils/stateMachineUtils';
import { StageTransitionEditor } from './StageTransitionEditor';
import { StateData, EdgeData, StageTransition } from '../../types/stateMachine';

interface TransitionEditorProps {
  nodes: Node<StateData>[];
  edges: Edge<EdgeData>[];
  onEdgesChange: (edges: Edge<EdgeData>[]) => void;
}

interface EditingTransition {
  id: string | null;
  source: string;
  target: string;
  label: string;
  isError: boolean;
  stageTransitions: StageTransition[];
}

export const TransitionEditor: React.FC<TransitionEditorProps> = ({
  nodes,
  edges,
  onEdgesChange,
}) => {
  const [newTransition, setNewTransition] = useState({
    source: '',
    target: '',
    label: '',
    isError: false,
  });

  const [editingTransition, setEditingTransition] = useState<EditingTransition>({
    id: null,
    source: '',
    target: '',
    label: '',
    isError: false,
    stageTransitions: [],
  });

  // Update stage transitions when source or target changes
  useEffect(() => {
    if (editingTransition.id) {
      // Clear stage transitions if source or target states don't have stages
      const sourceStages = getSourceStages(editingTransition.source);
      const targetStages = getTargetStages(editingTransition.target);
      
      if (sourceStages.length === 0 || targetStages.length === 0) {
        setEditingTransition(prev => ({
          ...prev,
          stageTransitions: []
        }));
      }
    }
  }, [editingTransition.source, editingTransition.target]);

  const addTransition = () => {
    if (newTransition.source && newTransition.target && newTransition.label) {
      const sourceStages = getSourceStages(newTransition.source);
      const targetStages = getTargetStages(newTransition.target);
      
      const newEdge = createTransitionEdge(
        newTransition.source,
        newTransition.target,
        newTransition.label,
        newTransition.isError,
        [] // Initial empty stage transitions
      );
      onEdgesChange([...edges, newEdge]);
      setNewTransition({ source: '', target: '', label: '', isError: false });
    }
  };

  const removeTransition = (id: string) => {
    onEdgesChange(edges.filter(edge => edge.id !== id));
  };

  const startEditing = (edge: Edge<EdgeData>) => {
    setEditingTransition({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label as string,
      isError: edge.className?.includes('text-red-400') || false,
      stageTransitions: edge.data?.stageTransitions || [],
    });
  };

  const cancelEditing = () => {
    setEditingTransition({
      id: null,
      source: '',
      target: '',
      label: '',
      isError: false,
      stageTransitions: [],
    });
  };

  const saveEditing = () => {
    if (editingTransition.id) {
      onEdgesChange(
        edges.map(edge =>
          edge.id === editingTransition.id
            ? {
                ...createTransitionEdge(
                  editingTransition.source,
                  editingTransition.target,
                  editingTransition.label,
                  editingTransition.isError,
                  editingTransition.stageTransitions
                ),
                id: edge.id,
              }
            : edge
        )
      );
      cancelEditing();
    }
  };

  const moveTransition = (index: number, direction: 'up' | 'down') => {
    const newEdges = [...edges];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newEdges[index], newEdges[newIndex]] = [newEdges[newIndex], newEdges[index]];
    onEdgesChange(newEdges);
  };

  const handleStageTransitionsChange = (stageTransitions: StageTransition[]) => {
    if (editingTransition.id) {
      setEditingTransition({
        ...editingTransition,
        stageTransitions,
      });
    }
  };

  const getSourceStages = (sourceId: string) => {
    const sourceNode = nodes.find(node => node.id === sourceId);
    return sourceNode?.data.stages || [];
  };

  const getTargetStages = (targetId: string) => {
    const targetNode = nodes.find(node => node.id === targetId);
    return targetNode?.data.stages || [];
  };

  const hasStages = (edge: Edge<EdgeData>) => {
    const sourceStages = getSourceStages(edge.source);
    const targetStages = getTargetStages(edge.target);
    return sourceStages.length > 0 && targetStages.length > 0;
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-yellow-400/20">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Transitions</h3>

      <div className="space-y-4">
        {edges.map((edge, index) => (
          <div
            key={edge.id}
            className="space-y-4 bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingTransition.id === edge.id ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <select
                      className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                      value={editingTransition.source}
                      onChange={(e) =>
                        setEditingTransition({
                          ...editingTransition,
                          source: e.target.value,
                        })
                      }
                    >
                      <option value="">From State</option>
                      {nodes.map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.data.label}
                          {node.data.stages && node.data.stages.length > 0 && 
                            ` (${node.data.stages.length} stages)`}
                        </option>
                      ))}
                    </select>

                    <select
                      className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                      value={editingTransition.target}
                      onChange={(e) =>
                        setEditingTransition({
                          ...editingTransition,
                          target: e.target.value,
                        })
                      }
                    >
                      <option value="">To State</option>
                      {nodes.map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.data.label}
                          {node.data.stages && node.data.stages.length > 0 && 
                            ` (${node.data.stages.length} stages)`}
                        </option>
                      ))}
                    </select>

                    <Input
                      placeholder="Transition Label"
                      value={editingTransition.label}
                      onChange={(e) =>
                        setEditingTransition({
                          ...editingTransition,
                          label: e.target.value,
                        })
                      }
                      className="bg-black/40 border-yellow-400/20"
                    />

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 text-yellow-400">
                        <input
                          type="checkbox"
                          checked={editingTransition.isError}
                          onChange={(e) =>
                            setEditingTransition({
                              ...editingTransition,
                              isError: e.target.checked,
                            })
                          }
                          className="rounded border-yellow-400/20"
                        />
                        Error Transition
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
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

                {getSourceStages(editingTransition.source).length > 0 &&
                  getTargetStages(editingTransition.target).length > 0 && (
                    <StageTransitionEditor
                      sourceStages={getSourceStages(editingTransition.source)}
                      targetStages={getTargetStages(editingTransition.target)}
                      transitions={editingTransition.stageTransitions}
                      onTransitionsChange={handleStageTransitionsChange}
                    />
                  )}
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={edge.className}>
                    {edge.source} → {edge.target}
                  </span>
                  <span className="text-sm text-gray-400">
                    Trigger: {edge.label}
                  </span>
                  {hasStages(edge) && (
                    <span className="text-sm text-yellow-400">
                      (Has stages available)
                    </span>
                  )}
                  {edge.data?.stageTransitions?.length > 0 && (
                    <span className="text-sm text-yellow-400">
                      ({edge.data.stageTransitions.length} stage transitions)
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTransition(index, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTransition(index, 'down')}
                    disabled={index === edges.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(edge)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeTransition(edge.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.source}
          onChange={(e) =>
            setNewTransition({ ...newTransition, source: e.target.value })
          }
        >
          <option value="">From State</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data.label}
              {node.data.stages && node.data.stages.length > 0 && 
                ` (${node.data.stages.length} stages)`}
            </option>
          ))}
        </select>

        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.target}
          onChange={(e) =>
            setNewTransition({ ...newTransition, target: e.target.value })
          }
        >
          <option value="">To State</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data.label}
              {node.data.stages && node.data.stages.length > 0 && 
                ` (${node.data.stages.length} stages)`}
            </option>
          ))}
        </select>

        <Input
          placeholder="Transition Label"
          value={newTransition.label}
          onChange={(e) =>
            setNewTransition({ ...newTransition, label: e.target.value })
          }
          className="bg-black/40 border-yellow-400/20"
        />

        <div className="flex items-center">
          <label className="flex items-center gap-2 text-yellow-400">
            <input
              type="checkbox"
              checked={newTransition.isError}
              onChange={(e) =>
                setNewTransition({ ...newTransition, isError: e.target.checked })
              }
              className="rounded border-yellow-400/20"
            />
            Error Transition
          </label>
        </div>
      </div>

      <Button
        onClick={addTransition}
        disabled={!newTransition.source || !newTransition.target || !newTransition.label}
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Transition
      </Button>
    </div>
  );
};