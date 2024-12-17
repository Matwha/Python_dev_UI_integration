import React, { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Stage, StageTransition } from '../../types/stateMachine';
import { createStageTransition } from '../../utils/stateMachineUtils';

interface StageTransitionEditorProps {
  sourceStages: Stage[];
  targetStages: Stage[];
  transitions: StageTransition[];
  onTransitionsChange: (transitions: StageTransition[]) => void;
}

interface EditingTransition {
  id: string | null;
  fromStageId: string;
  toStageId: string;
  condition: string;
  duration: number;
}

export const StageTransitionEditor: React.FC<StageTransitionEditorProps> = ({
  sourceStages,
  targetStages,
  transitions,
  onTransitionsChange,
}) => {
  const [newTransition, setNewTransition] = useState({
    fromStageId: '',
    toStageId: '',
    condition: '',
    duration: 1000,
  });

  const [editingTransition, setEditingTransition] = useState<EditingTransition>({
    id: null,
    fromStageId: '',
    toStageId: '',
    condition: '',
    duration: 1000,
  });

  const addTransition = () => {
    if (newTransition.fromStageId && newTransition.toStageId) {
      const transition = createStageTransition(
        newTransition.fromStageId,
        newTransition.toStageId,
        newTransition.condition,
        newTransition.duration
      );
      onTransitionsChange([...transitions, transition]);
      setNewTransition({
        fromStageId: '',
        toStageId: '',
        condition: '',
        duration: 1000,
      });
    }
  };

  const removeTransition = (id: string) => {
    onTransitionsChange(transitions.filter(t => t.id !== id));
  };

  const moveTransition = (index: number, direction: 'up' | 'down') => {
    const newTransitions = [...transitions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newTransitions[index], newTransitions[newIndex]] = [
      newTransitions[newIndex],
      newTransitions[index],
    ];
    onTransitionsChange(newTransitions);
  };

  const startEditing = (transition: StageTransition) => {
    setEditingTransition({
      id: transition.id,
      fromStageId: transition.fromStageId,
      toStageId: transition.toStageId,
      condition: transition.condition || '',
      duration: transition.duration,
    });
  };

  const cancelEditing = () => {
    setEditingTransition({
      id: null,
      fromStageId: '',
      toStageId: '',
      condition: '',
      duration: 1000,
    });
  };

  const saveEditing = () => {
    if (editingTransition.id) {
      onTransitionsChange(
        transitions.map(t =>
          t.id === editingTransition.id
            ? {
                ...t,
                fromStageId: editingTransition.fromStageId,
                toStageId: editingTransition.toStageId,
                condition: editingTransition.condition,
                duration: editingTransition.duration,
              }
            : t
        )
      );
      cancelEditing();
    }
  };

  const getStageById = (id: string): Stage | undefined => {
    return [...sourceStages, ...targetStages].find(s => s.id === id);
  };

  return (
    <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-yellow-400/20">
      <h4 className="text-md font-semibold text-yellow-400 mb-4">Stage Transitions</h4>

      <div className="space-y-4">
        {transitions.map((transition, index) => (
          <div
            key={transition.id}
            className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingTransition.id === transition.id ? (
              <div className="flex-1 grid grid-cols-4 gap-4">
                <select
                  className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                  value={editingTransition.fromStageId}
                  onChange={(e) =>
                    setEditingTransition({
                      ...editingTransition,
                      fromStageId: e.target.value,
                    })
                  }
                >
                  <option value="">From Stage</option>
                  {sourceStages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>

                <select
                  className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
                  value={editingTransition.toStageId}
                  onChange={(e) =>
                    setEditingTransition({
                      ...editingTransition,
                      toStageId: e.target.value,
                    })
                  }
                >
                  <option value="">To Stage</option>
                  {targetStages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="Condition"
                  value={editingTransition.condition}
                  onChange={(e) =>
                    setEditingTransition({
                      ...editingTransition,
                      condition: e.target.value,
                    })
                  }
                  className="bg-black/40 border-yellow-400/20"
                />

                <Input
                  type="number"
                  placeholder="Duration (ms)"
                  value={editingTransition.duration}
                  onChange={(e) =>
                    setEditingTransition({
                      ...editingTransition,
                      duration: parseInt(e.target.value) || 1000,
                    })
                  }
                  min={100}
                  step={100}
                  className="bg-black/40 border-yellow-400/20"
                />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div className="text-sm">
                  <span className="text-gray-400">From:</span>{' '}
                  <span className="text-yellow-400">
                    {getStageById(transition.fromStageId)?.name}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">To:</span>{' '}
                  <span className="text-yellow-400">
                    {getStageById(transition.toStageId)?.name}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Condition:</span>{' '}
                  <span className="text-yellow-400">{transition.condition || 'None'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Duration:</span>{' '}
                  <span className="text-yellow-400">{transition.duration}ms</span>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {editingTransition.id === transition.id ? (
                <>
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
                </>
              ) : (
                <>
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
                    disabled={index === transitions.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(transition)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeTransition(transition.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.fromStageId}
          onChange={(e) =>
            setNewTransition({ ...newTransition, fromStageId: e.target.value })
          }
        >
          <option value="">From Stage</option>
          {sourceStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>

        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newTransition.toStageId}
          onChange={(e) =>
            setNewTransition({ ...newTransition, toStageId: e.target.value })
          }
        >
          <option value="">To Stage</option>
          {targetStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>

        <Input
          placeholder="Condition"
          value={newTransition.condition}
          onChange={(e) =>
            setNewTransition({ ...newTransition, condition: e.target.value })
          }
          className="bg-black/40 border-yellow-400/20"
        />

        <Input
          type="number"
          placeholder="Duration (ms)"
          value={newTransition.duration}
          onChange={(e) =>
            setNewTransition({
              ...newTransition,
              duration: parseInt(e.target.value) || 1000,
            })
          }
          min={100}
          step={100}
          className="bg-black/40 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addTransition}
        disabled={!newTransition.fromStageId || !newTransition.toStageId}
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Stage Transition
      </Button>
    </div>
  );
};