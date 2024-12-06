import React, { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Stage } from '../../types/stateMachine';
import { createStage } from '../../utils/stateMachineUtils';

interface StageEditorProps {
  stages: Stage[];
  onStagesChange: (stages: Stage[]) => void;
}

interface EditingStage {
  id: string | null;
  name: string;
  duration: number;
  description: string;
}

export const StageEditor: React.FC<StageEditorProps> = ({ stages, onStagesChange }) => {
  const [newStage, setNewStage] = useState({
    name: '',
    duration: 1000,
    description: '',
  });

  const [editingStage, setEditingStage] = useState<EditingStage>({
    id: null,
    name: '',
    duration: 1000,
    description: '',
  });

  const addStage = () => {
    if (newStage.name && newStage.description) {
      const stage = createStage(
        newStage.name,
        newStage.duration,
        newStage.description
      );
      onStagesChange([...stages, stage]);
      setNewStage({ name: '', duration: 1000, description: '' });
    }
  };

  const removeStage = (id: string) => {
    onStagesChange(stages.filter(stage => stage.id !== id));
  };

  const moveStage = (index: number, direction: 'up' | 'down') => {
    const newStages = [...stages];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newStages[index], newStages[newIndex]] = [newStages[newIndex], newStages[index]];
    onStagesChange(newStages);
  };

  const startEditing = (stage: Stage) => {
    setEditingStage({
      id: stage.id,
      name: stage.name,
      duration: stage.duration,
      description: stage.description,
    });
  };

  const cancelEditing = () => {
    setEditingStage({
      id: null,
      name: '',
      duration: 1000,
      description: '',
    });
  };

  const saveEditing = () => {
    if (editingStage.id) {
      onStagesChange(
        stages.map(stage =>
          stage.id === editingStage.id
            ? {
                ...stage,
                name: editingStage.name,
                duration: editingStage.duration,
                description: editingStage.description,
              }
            : stage
        )
      );
      cancelEditing();
    }
  };

  return (
    <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-yellow-400/20">
      <h4 className="text-md font-semibold text-yellow-400 mb-4">Stages</h4>
      
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingStage.id === stage.id ? (
              <div className="flex-1 grid grid-cols-3 gap-4">
                <Input
                  value={editingStage.name}
                  onChange={(e) =>
                    setEditingStage({ ...editingStage, name: e.target.value })
                  }
                  placeholder="Stage Name"
                  className="bg-black/40 border-yellow-400/20"
                />
                <Input
                  type="number"
                  value={editingStage.duration}
                  onChange={(e) =>
                    setEditingStage({
                      ...editingStage,
                      duration: parseInt(e.target.value) || 1000,
                    })
                  }
                  placeholder="Duration (ms)"
                  min={100}
                  step={100}
                  className="bg-black/40 border-yellow-400/20"
                />
                <Input
                  value={editingStage.description}
                  onChange={(e) =>
                    setEditingStage({
                      ...editingStage,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="bg-black/40 border-yellow-400/20"
                />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="text-sm">
                  <span className="text-gray-400">Name:</span>{' '}
                  <span className="text-yellow-400">{stage.name}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Duration:</span>{' '}
                  <span className="text-yellow-400">{stage.duration}ms</span>
                </div>
                <div className="text-sm text-yellow-400">{stage.description}</div>
              </div>
            )}
            <div className="flex gap-2">
              {editingStage.id === stage.id ? (
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
                    onClick={() => moveStage(index, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveStage(index, 'down')}
                    disabled={index === stages.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(stage)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeStage(stage.id)}
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

      <div className="grid grid-cols-3 gap-4">
        <Input
          placeholder="Stage Name"
          value={newStage.name}
          onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
          className="bg-black/40 border-yellow-400/20"
        />
        <Input
          type="number"
          placeholder="Duration (ms)"
          value={newStage.duration}
          onChange={(e) =>
            setNewStage({ ...newStage, duration: parseInt(e.target.value) || 1000 })
          }
          min={100}
          step={100}
          className="bg-black/40 border-yellow-400/20"
        />
        <Input
          placeholder="Description"
          value={newStage.description}
          onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
          className="bg-black/40 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addStage}
        disabled={!newStage.name || !newStage.description}
        className="mt-4"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Stage
      </Button>
    </div>
  );
};