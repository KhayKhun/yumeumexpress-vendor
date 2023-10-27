import io from "socket.io-client";

const socket = io("https://yumyum-server.onrender.com/");

export default socket;