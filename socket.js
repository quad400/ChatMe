import { io } from "socket.io-client";
import { ADDRESS } from "./core/api";

let socket;

const connectSocket = (user_id) => {
  socket = io(ADDRESS, {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
