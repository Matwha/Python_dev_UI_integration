import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface File {
  name: string;
  content: string;
}

interface CodeEditorProps {
  //onCodeChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [newFileName, setNewFileName] = useState<string>('');

  useEffect(() => {
    // Simulating fetching saved files
    setFiles([
      { name: 'example.py', content: 'print("Hello, World!")' },
      { name: 'llama_config.py', content: 'model = LlamaForCausalLM.from_pretrained("path/to/model")' },
    ]);
  }, []);

  // Remove this useEffect hook
  // useEffect(() => {
  //   onCodeChange(code);
  // }, [code, onCodeChange]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const selectFile = (fileName: string) => {
    setSelectedFile(fileName);
    const selectedFileContent = files.find(file => file.name === fileName)?.content || '';
    setCode(selectedFileContent);
  };

  const saveFile = () => {
    if (selectedFile) {
      setFiles(files.map(file =>
        file.name === selectedFile ? { ...file, content: code } : file
      ));
    } else if (newFileName) {
      setFiles([...files, { name: newFileName, content: code }]);
      setSelectedFile(newFileName);
      setNewFileName('');
    }
  };

  const createNewFile = () => {
    if (newFileName) {
      setFiles([...files, { name: newFileName, content: '' }]);
      setSelectedFile(newFileName);
      setCode('');
      setNewFileName('');
    }
  };

  const executeCode = () => {
    // Simulating code execution
    setOutput(`Executing code:\n${code}\n\nOutput: Hello, World!`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Code Editor</h2>

      <div className="flex space-x-4">
        <div className="w-1/4">
          <h3 className="text-lg font-medium mb-2">Files</h3>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                onClick={() => selectFile(file.name)}
                className={`cursor-pointer p-2 rounded ${selectedFile === file.name ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
              >
                {file.name}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="New file name"
            />
            <button
              onClick={createNewFile}
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New File
            </button>
          </div>
        </div>

        <div className="w-3/4">
          <SyntaxHighlighter
            language="python"
            style={darcula}
            className="h-96 overflow-auto"
          >
            {code}
          </SyntaxHighlighter>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="mt-4 w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your Python code here..."
          />
          <div className="mt-4 space-x-2">
            <button
              onClick={saveFile}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save
            </button>
            <button
              onClick={executeCode}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Execute
            </button>
          </div>
          {output && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Output:</h3>
              <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-auto">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

