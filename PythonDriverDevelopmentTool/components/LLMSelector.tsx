import React, { useState, useEffect } from 'react';

interface Model {
  id: string;
  name: string;
}

const LLMSelector: React.FC<{ onSelectModel: (model: string) => void }> = ({ onSelectModel }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('http://0.0.0.0:1234/v1/models');
      const data = await response.json();
      setModels(data.data || []);
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setSelectedModel(model);
    onSelectModel(model);
  };

  return (
    <div className="mb-4">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700">
        Select LLM Model
      </label>
      {models.length > 0 ? (
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      ) : (
        <p className="mt-1 text-sm text-red-600">No models available. Please check your LM Studio server.</p>
      )}
    </div>
  );
};

export default LLMSelector;

