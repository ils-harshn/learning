import { io } from "socket.io-client";

const URL = process.env.REACT_APP_TIC_TAC_TOE_SOCKET_URL;
export const socket = io(URL, {
  autoConnect: false,
});
