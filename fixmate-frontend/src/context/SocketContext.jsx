import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket connected');
        setConnected(true);
        
        if (user.role === 'worker' || user.type === 'worker') {
          newSocket.emit('worker:join', user._id);
        } else {
          newSocket.emit('user:join', user._id);
        }
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setConnected(false);
      });

      newSocket.on('connection:confirmed', (data) => {
        console.log('✅ Connection confirmed:', data);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const value = {
    socket,
    connected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
