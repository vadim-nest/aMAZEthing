import http from 'http';
import { Server } from 'socket.io';

export default function Connect(server: http.Server) {

  let waiting: string[] = [];
  let playerSearch: string[] = [];
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173','http://localhost:5174'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  io.on('connection', socket => {
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
      if (playerSearch.length !== 0) {
        const id = playerSearch.pop() as string;
        socket.join(id);
        io.to(id).emit('Game start');
      } else {
        playerSearch.push(socket.id);
      }
    });
    socket.on('new minion', type => {
        socket.broadcast.emit('new minion', type); //TODO: change it to room
    });
    socket.on('minion move', (direction, minionId) => {
        socket.broadcast.emit('minion move', direction, minionId);
    });

    socket.on('enterMessage' , (data:string) => console.log(data))

    socket.on('enterTower', (towerId, minionId) => {
        socket.broadcast.emit('enterTower', towerId, minionId)
    })

    socket.on('disconnect', ()=> console.log('a user disconnected'))
  })
}
