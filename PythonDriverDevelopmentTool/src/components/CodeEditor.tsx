import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
// import { Backend } from '../App'; //Removed import as backend is no longer used

// interface CodeEditorProps {
//   backend: Backend;
// }

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const executeCode = async () => {
    try {
      const response = await fetch(`/api/execute-code`, { //Removed backend from the URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code. Please try again.');
    }
  };

  return (
    <div>
      <h2>Code Editor</h2> {/*Removed backend from title*/}
      <AceEditor
        mode="python"
        theme="monokai"
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
        style={{ width: '100%', height: '400px' }}
      />
      <button onClick={executeCode}>Execute Code</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;

