import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const PresenceContext = createContext();

export function usePresence() {
  return useContext(PresenceContext);
}

export default function PresenceSocketProvider({ username, children }) {
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    let socket;
    import('socket.io-client').then(io => {
      socket = io.connect('http://localhost:4000');
      socketRef.current = socket;
      socket.emit('presence:join', { user: username });
      socket.on('presence:update', (userList) => {
        setUsers(userList);
      });
      socket.on('disconnect', () => {
        setUsers([]);
      });
    });
    return () => {
      if (socket) socket.disconnect();
    };
  }, [username]);

  return (
    <PresenceContext.Provider value={{ users }}>
      {children}
    </PresenceContext.Provider>
  );
}
