import React, { useState } from 'react';
import EnvironmentManager from './components/EnvironmentManager';
import PackageExplorer from './components/PackageExplorer';
import CodeEditor from './components/CodeEditor';
import Documentation from './components/Documentation';
import ContextHelper from './components/ContextHelper';
import LLMSelector from './components/LLMSelector';
import FloatingChatWindow from './components/FloatingChatWindow';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('environment');
  const [selectedModel, setSelectedModel] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [codeContext, setCodeContext] = useState('');

  const updateCodeContext = (newContext: string) => {
    setCodeContext(newContext);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'environment':
        return <EnvironmentManager />;
      case 'packages':
        return <PackageExplorer />;
      case 'editor':
        return <CodeEditor />;
      case 'docs':
        return <Documentation />;
      case 'context':
        return <ContextHelper />;
      default:
        return <EnvironmentManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">Python Driver Dev Tool</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('environment')}
                  className={`${
                    activeTab === 'environment'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Environment Manager
                </button>
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`${
                    activeTab === 'packages'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Package Explorer
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`${
                    activeTab === 'editor'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Code Editor
                </button>
                <button
                  onClick={() => setActiveTab('context')}
                  className={`${
                    activeTab === 'context'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Context Helper
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`${
                    activeTab === 'docs'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Documentation
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <LLMSelector onSelectModel={setSelectedModel} />
              <button
                onClick={() => setShowChat(true)}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Open Chat
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-screen p-4">
                {renderActiveTab()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showChat && (
        <FloatingChatWindow
          selectedModel={selectedModel}
          codeContext={codeContext}
          onClose={() => setShowChat(false)}
          updateCodeContext={updateCodeContext}
        />
      )}
    </div>
  );
};

export default App;

