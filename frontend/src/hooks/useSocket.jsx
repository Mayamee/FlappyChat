import { io } from 'socket.io-client';

const {
  createContext, useEffect, useState, useContext,
} = require('react');

const socketCTX = createContext(null);

export const useSocket = (url, opts = {}) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketIO = io(url, opts);
    setSocket(socketIO);
    return () => {
      socketIO.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return socket;
};

export const SocketProvider = ({ children, opts }) => {
  const { url, ...restOpts } = opts;
  const socket = useSocket(url, restOpts);
  return <socketCTX.Provider value={socket}>{children}</socketCTX.Provider>;
};

export const useSocketContext = () => useContext(socketCTX);
