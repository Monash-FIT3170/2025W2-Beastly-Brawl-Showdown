import React, { useState } from 'react';
import { PopupClean } from "../../components/popups/PopupClean"
import socket from "../../socket";


export function LoginPopup({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Assume socket is connected and available as `socket`
  // (you'll pass or import socket instance)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('login', { email, password });
  };

  React.useEffect(() => {
    socket.on('loginResponse', (data) => {
      setMessage(data.message);
      if (data.success) {
        onLoginSuccess();
      }
    });

    return () => {
      socket.off('loginResponse');
    };
  }, []);

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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 rounded border"
        />
        <button type="submit" className="bg-[#403245] text-white py-2 rounded">
          Log In
        </button>
        {message && <p className="text-red-600">{message}</p>}
      </form>
    </PopupClean>
  );
}
