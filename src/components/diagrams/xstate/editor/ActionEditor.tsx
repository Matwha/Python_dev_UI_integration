import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';

interface Action {
  id: string;
  type: 'assign' | 'invoke' | 'custom';
  name: string;
  params?: Record<string, any>;
}

interface ActionEditorProps {
  actions: Action[];
  onActionsChange: (actions: Action[]) => void;
}

export const ActionEditor: React.FC<ActionEditorProps> = ({
  actions,
  onActionsChange,
}) => {
  const [newAction, setNewAction] = useState<Partial<Action>>({
    type: 'assign',
  });

  const addAction = () => {
    if (newAction.type && newAction.name) {
      onActionsChange([
        ...actions,
        {
          id: crypto.randomUUID(),
          type: newAction.type,
          name: newAction.name,
          params: newAction.params,
        },
      ]);
      setNewAction({ type: 'assign' });
    }
  };

  const removeAction = (id: string) => {
    onActionsChange(actions.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-yellow-400">Actions</h3>

      <div className="space-y-2">
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-yellow-400/20"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{action.type}</span>
              <span className="text-yellow-400">{action.name}</span>
              {action.params && (
                <span className="text-sm text-gray-400">
                  {JSON.stringify(action.params)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeAction(action.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          className="bg-black/40 border border-yellow-400/20 rounded-lg p-2 text-yellow-400"
          value={newAction.type}
          onChange={(e) =>
            setNewAction({
              ...newAction,
              type: e.target.value as Action['type'],
            })
          }
        >
          <option value="assign">Assign</option>
          <option value="invoke">Invoke</option>
          <option value="custom">Custom</option>
        </select>

        <Input
          placeholder="Action name"
          value={newAction.name || ''}
          onChange={(e) =>
            setNewAction({ ...newAction, name: e.target.value })
          }
          className="bg-black/40 border-yellow-400/20"
        />
      </div>

      <Button
        onClick={addAction}
        disabled={!newAction.type || !newAction.name}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Action
      </Button>
    </div>
  );
};