import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FloatingChatWindowProps {
  selectedModel: string;
  codeContext: string;
  onClose: () => void;
  updateCodeContext: (newContext: string) => void;
}

const FloatingChatWindow: React.FC<FloatingChatWindowProps> = ({ selectedModel, codeContext, onClose, updateCodeContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (chatWindowRef.current && e.buttons === 1) {
        setPosition({
          x: e.clientX - chatWindowRef.current.offsetWidth / 2,
          y: e.clientY - 20,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const updateContext = (newContext: string) => {
    updateCodeContext(newContext);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://0.0.0.0:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: `You are a helpful assistant. Current code context: ${codeContext}` },
            ...messages,
            userMessage,
          ],
          temperature: 0.7,
          max_tokens: -1,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Check if the assistant's message contains code and update the context
      if (assistantMessage.content.includes('\`\`\`')) {
        const codeMatch = assistantMessage.content.match(/\`\`\`[\s\S]*?\`\`\`/);
        if (codeMatch) {
          const extractedCode = codeMatch[0].replace(/\`\`\`/g, '').trim();
          updateContext(extractedCode);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div
      ref={chatWindowRef}
      className={`fixed bg-white rounded-lg shadow-lg ${
        isMinimized ? 'w-64 h-12' : 'w-96 h-96'
      } overflow-hidden`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="bg-indigo-600 text-white p-2 cursor-move flex justify-between items-center">
        <span>Chat with LLM</span>
        <div className="flex space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="h-64 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="font-bold">Current Code Context:</h3>
              <pre className="bg-gray-100 p-2 rounded">{codeContext}</pre>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-grow mr-2 p-2 border rounded"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingChatWindow;

