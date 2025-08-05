import React, { useState, useEffect } from 'react';
import socket from "../../socket";
import { PopupClean } from "../../components/popups/PopupClean";

export function LoginPopup({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Register-only field
  const [username, setUsername] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      socket.emit('login', { email, password });
    } else {
      socket.emit('register', { email, username, password });
    }
  };

  useEffect(() => {
    const loginListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        onLoginSuccess();
      }
    };

    const registerListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        // After successful registration, switch back to login mode
        setMode('login');
        setMessage('Registration successful! Please log in.');
      }
    };

    socket.on('loginResponse', loginListener);
    socket.on('registerResponse', registerListener);

    return () => {
      socket.off('loginResponse', loginListener);
      socket.off('registerResponse', registerListener);
    };
  }, [onLoginSuccess]);

  return (
    <PopupClean>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 rounded border"
        />

        {mode === 'register' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="p-2 rounded border"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 rounded border"
        />

        <button type="submit" className="bg-[#403245] text-white py-2 rounded">
          {mode === 'login' ? 'Log In' : 'Register'}
        </button>

        {message && <p className="text-red-600">{message}</p>}

        <button
          type="button"
          onClick={() => {
            setMessage('');
            setMode(mode === 'login' ? 'register' : 'login');
          }}
          className="mt-2 underline text-sm"
        >
          {mode === 'login'
            ? "Don't have an account? Register here"
            : 'Already have an account? Log in here'}
        </button>
      </form>
    </PopupClean>
  );
}
