import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "../api/user/request";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true, 
      autoConnect: true,
    });
  }
  return socket;
};