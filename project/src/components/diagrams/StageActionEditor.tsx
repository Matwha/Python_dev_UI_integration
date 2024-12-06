import React, { useState } from 'react';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { StageAction } from '../../types/stateMachine';
import { createStageAction } from '../../utils/stateMachineUtils';

interface StageActionEditorProps {
  actions: StageAction[];
  onActionsChange: (actions: StageAction[]) => void;
}

interface EditingAction {
  id: string | null;
  type: 'command' | 'evaluation';
  command?: string;
  condition?: string;
  errorMessage?: string;
  timeout?: number;
}

export const StageActionEditor: React.FC<StageActionEditorProps> = ({
  actions,
  onActionsChange,
}) => {
  const [newAction, setNewAction] = useState<Partial<EditingAction>>({
    type: 'command',
  });

  const [editingAction, setEditingAction] = useState<EditingAction>({
    id: null,
    type: 'command',
  });

  const addAction = () => {
    if (newAction.type) {
      const action = createStageAction(newAction.type, {
        command: newAction.command,
        condition: newAction.condition,
        errorMessage: newAction.errorMessage,
        timeout: newAction.timeout,
      });
      onActionsChange([...actions, action]);
      setNewAction({ type: 'command' });
    }
  };

  const removeAction = (id: string) => {
    onActionsChange(actions.filter(action => action.id !== id));
  };

  const startEditing = (action: StageAction) => {
    setEditingAction({
      id: action.id,
      type: action.type,
      command: action.command,
      condition: action.condition,
      errorMessage: action.errorMessage,
      timeout: action.timeout,
    });
  };

  const cancelEditing = () => {
    setEditingAction({
      id: null,
      type: 'command',
    });
  };

  const saveEditing = () => {
    if (editingAction.id) {
      onActionsChange(
        actions.map(action =>
          action.id === editingAction.id
            ? {
                ...action,
                type: editingAction.type,
                command: editingAction.command,
                condition: editingAction.condition,
                errorMessage: editingAction.errorMessage,
                timeout: editingAction.timeout,
              }
            : action
        )
      );
      cancelEditing();
    }
  };

  const renderActionForm = (action: Partial<EditingAction>, onChange: (updates: Partial<EditingAction>) => void) => (
    <div className="grid grid-cols-2 gap-4">
      <select
        className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
        value={action.type}
        onChange={(e) => onChange({ ...action, type: e.target.value as 'command' | 'evaluation' })}
      >
        <option value="command">Command</option>
        <option value="evaluation">Evaluation</option>
      </select>

      {action.type === 'command' ? (
        <>
          <Input
            placeholder="Command"
            value={action.command || ''}
            onChange={(e) => onChange({ ...action, command: e.target.value })}
            className="bg-black/40 border-yellow-400/20"
          />
          <Input
            type="number"
            placeholder="Timeout (ms)"
            value={action.timeout || ''}
            onChange={(e) => onChange({ ...action, timeout: parseInt(e.target.value) || undefined })}
            className="bg-black/40 border-yellow-400/20"
          />
        </>
      ) : (
        <>
          <Input
            placeholder="Condition"
            value={action.condition || ''}
            onChange={(e) => onChange({ ...action, condition: e.target.value })}
            className="bg-black/40 border-yellow-400/20"
          />
          <Input
            placeholder="Error Message"
            value={action.errorMessage || ''}
            onChange={(e) => onChange({ ...action, errorMessage: e.target.value })}
            className="bg-black/40 border-yellow-400/20"
          />
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-yellow-400">Actions</h4>

      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="bg-black/40 p-3 rounded-lg border border-yellow-400/10"
          >
            {editingAction.id === action.id ? (
              <>
                {renderActionForm(editingAction, setEditingAction)}
                <div className="flex justify-end gap-2 mt-4">
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
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-gray-400">Type:</span>{' '}
                    <span className="text-yellow-400">{action.type}</span>
                  </div>
                  {action.type === 'command' ? (
                    <>
                      <div className="text-sm">
                        <span className="text-gray-400">Command:</span>{' '}
                        <span className="text-yellow-400">{action.command}</span>
                      </div>
                      {action.timeout && (
                        <div className="text-sm">
                          <span className="text-gray-400">Timeout:</span>{' '}
                          <span className="text-yellow-400">{action.timeout}ms</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-sm">
                        <span className="text-gray-400">Condition:</span>{' '}
                        <span className="text-yellow-400">{action.condition}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Error:</span>{' '}
                        <span className="text-yellow-400">{action.errorMessage}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(action)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeAction(action.id)}
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

      <div className="space-y-4">
        {renderActionForm(newAction, setNewAction)}
        <Button
          onClick={addAction}
          disabled={!newAction.type || (newAction.type === 'command' ? !newAction.command : !newAction.condition)}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Action
        </Button>
      </div>
    </div>
  );
};