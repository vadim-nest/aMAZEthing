import http from 'http';
import { Server } from 'socket.io';

export default function Connect(server: http.Server) {

  let waiting = [];
  let playerSearch = [];
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('host', () => {
      waiting.push(socket.id);
    })
    socket.on('join', (id) => {
      if (waiting.includes(id)) {
        socket.join(id);
        io.to(id).emit('Game start')
      }
    })
    socket.on('play', () => {
      playerSearch.push(socket.id);
      socket.on('join', (id) => {
        if (playerSearch.length === 1) {
          playerSearch.pop();
          socket.join(id);
          io.to(id).emit('Game start');
        }
      })
    })
  });
}
