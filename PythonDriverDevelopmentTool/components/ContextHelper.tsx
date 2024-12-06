import React, { useState, useEffect } from 'react';

interface Suggestion {
  type: 'import' | 'function' | 'class' | 'configuration';
  content: string;
}

const ContextHelper: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedEnv, setSelectedEnv] = useState<string>('');
  const [currentCode, setCurrentCode] = useState<string>('');

  useEffect(() => {
    // Simulating context-aware suggestions based on the environment and current code
    if (selectedEnv === 'llama') {
      setSuggestions([
        { type: 'import', content: 'from transformers import LlamaForCausalLM, LlamaTokenizer' },
        { type: 'function', content: 'def load_llama_model(model_path):' },
        { type: 'class', content: 'class LlamaConfig:' },
        { type: 'configuration', content: 'model_config = {"max_length": 512, "temperature": 0.7}' },
      ]);
    } else {
      setSuggestions([
        { type: 'import', content: 'import numpy as np' },
        { type: 'function', content: 'def process_data(data):' },
        { type: 'class', content: 'class DataProcessor:' },
        { type: 'configuration', content: 'config = {"batch_size": 32, "learning_rate": 0.001}' },
      ]);
    }
  }, [selectedEnv, currentCode]);

  const applySuggestion = (suggestion: Suggestion) => {
    setCurrentCode(prevCode => prevCode + '\n' + suggestion.content);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Context Helper</h2>
      
      <div>
        <label htmlFor="env-select" className="block text-sm font-medium text-gray-700">Select Environment</label>
        <select
          id="env-select"
          value={selectedEnv}
          onChange={(e) => setSelectedEnv(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an environment</option>
          <option value="default">Default</option>
          <option value="llama">Llama</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Suggestions</h3>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              onClick={() => applySuggestion(suggestion)}
              className="cursor-pointer p-2 rounded hover:bg-gray-100"
            >
              <span className="font-medium">{suggestion.type}: </span>
              {suggestion.content}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Current Code</h3>
        <pre className="p-2 bg-gray-100 rounded-md overflow-auto">{currentCode}</pre>
      </div>
    </div>
  );
};

export default ContextHelper;

