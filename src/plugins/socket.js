import io from 'socket.io-client';

// const socket = io('http://192.168.1.3:2222', {
   const socket = io('http://64.227.76.217:2222', {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
});

socket.on('connect', () => {
  console.log('Conectado al servidor Socket.io');
});

//escuchar mensaje
// socket.on('messages', (message) => {
//   console.log(message);
//   // this.messages.push(message);
// });

export default socket;
