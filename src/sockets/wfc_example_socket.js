import { io } from "socket.io-client";

const URL = process.env.REACT_APP_WFC_EXAMPLE_SOCKET_URL;
export const socket = io(URL, {
  autoConnect: false,
});
