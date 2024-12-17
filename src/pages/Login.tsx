import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login(
        {
          id: '1',
          username: 'admin',
          role: 'admin',
        },
        'mock-token'
      );
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black bg-honeycomb bg-[length:28px_50px] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-900/95 rounded-lg border border-yellow-400/20">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-12 h-12 text-yellow-400 mb-4" />
          <h1 className="text-2xl font-bold text-yellow-400">SCADA ATE Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};