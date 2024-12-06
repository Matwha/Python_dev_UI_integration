import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Code, Download, FileCode, Play, Terminal } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { PythonEnvironment } from './PythonEnvironment';
import { driverTemplates } from '../../utils/driverTemplates';

export const DriverBuilder: React.FC = () => {
  const [driverName, setDriverName] = useState('');
  const [driverType, setDriverType] = useState('plc');
  const [customCode, setCustomCode] = useState(driverTemplates.plc);
  const [output, setOutput] = useState('');
  const [showEnvConfig, setShowEnvConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDriver = () => {
    const template = driverTemplates[driverType as keyof typeof driverTemplates];
    setCustomCode(template);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([customCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${driverName || 'driver'}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput('Initializing Python environment...');
    
    try {
      // Dynamic import of pyodide to avoid build issues
      const { loadPyodide } = await import('pyodide');
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      });
      
      setOutput(prev => prev + '\nRunning code...');
      const result = await pyodide.runPythonAsync(customCode);
      setOutput(prev => prev + '\nOutput:\n' + result);
    } catch (error) {
      setOutput(prev => prev + '\nError:\n' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative space-y-6 bg-gray-900/80 p-8 rounded-lg border border-yellow-400/20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-honeycomb opacity-10 pointer-events-none" />
      
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileCode className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-yellow-400">Driver Builder</h3>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowEnvConfig(!showEnvConfig)}
          >
            Configure Python Environment
          </Button>
        </div>

        {showEnvConfig && (
          <PythonEnvironment />
        )}

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <Input
              label="Driver Name"
              placeholder="Enter driver name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="bg-black/40 border-yellow-400/20 focus:border-yellow-400"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-yellow-400">
                Driver Type
              </label>
              <select
                value={driverType}
                onChange={(e) => {
                  setDriverType(e.target.value);
                  setCustomCode(driverTemplates[e.target.value as keyof typeof driverTemplates]);
                }}
                className="w-full bg-black/40 border-2 border-yellow-400/20 rounded-lg p-2 text-yellow-400 focus:border-yellow-400"
              >
                <option value="plc">PLC Driver</option>
                <option value="modbus">Modbus Driver</option>
                <option value="canbus">CAN Bus Driver</option>
                <option value="scpi">SCPI Driver</option>
              </select>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleGenerateDriver}>
                <Code className="w-4 h-4 mr-2" />
                Generate Driver
              </Button>
              <Button onClick={handleDownload} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={runCode}
                className="bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                <Play className="w-4 h-4 mr-2" />
                {isLoading ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-[300px] bg-black/60 rounded-lg border-2 border-yellow-400/20">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={customCode}
                onChange={(value) => setCustomCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <h4 className="font-medium text-yellow-400">Output</h4>
              </div>
              <div className="bg-black/60 p-4 rounded-lg border-2 border-yellow-400/20 h-[150px] overflow-auto">
                <pre className="text-sm text-yellow-400/90 whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};