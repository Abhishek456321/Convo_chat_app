import { createContext, useContext, useState, type JSX } from "react";
import type { Socket } from "socket.io-client";
type SocketContextType = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};
const store = createContext<SocketContextType | null>(null);
export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  return (
    <store.Provider
      value={{
        setSocket,
        socket,
      }}
    >
      {children}
    </store.Provider>
  );
};

export const useSocket = () => useContext(store);
