import http from 'http';
import { Server } from 'socket.io';
import crypto from 'crypto';
import { generateMaze, MazeType } from './utils/maze';

export interface animal {
  pathFindingAlgo: 'dfs' | 'bfs' | 'dijk' | 'a*';
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
  sortingSpeed: number;
  type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear'
}

function generateRoomId() {
  const roomId = crypto.randomBytes(3).toString('hex');
  // TODO: Check this isn't already an active game
  return roomId;
}

export let mazes: {[id: string]: MazeType} = {};

export default function Connect(server: http.Server) {

  let waiting: {socketId: string, roomId: string}[] = [];
  let ready: {[roomId: string]: number} = {};
  let playerSearch: {socketId: string, roomId: string}[] = [];
  let activeGames: {
    roomId: string,
    p1Id: string,
    p2Id: string,
    timeRemaining: number,
    p1Coins: number,
    p2Coins: number,
    p1Towers: number[],
    p2Towers: number[],
    p1Minions: [number, animal][],
    p2Minions: [number, animal][],
  }[] = [];

  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  function clearRoomsBySocket(socket) {
    console.log(socket.rooms);
    for (let room of socket.rooms) {
      socket.leave(room);
      delete ready[room];
    }
    socket.join(socket.id);
    playerSearch = playerSearch.filter(room => {
      if (room.socketId === socket.id) {
        socket.leave(room.roomId);
        return false;
      }
      return true;
    });
    waiting = waiting.filter(room => {
      if (room.socketId === socket.id) {
        socket.leave(room.roomId);
        return false;
      }
      return true;
    });
    activeGames = activeGames.filter(game => game.p1Id !== socket.id && game.p2Id !== socket.id);
  }

  io.on('connection', socket => {
    console.log('user connected');
    socket.on('host', () => {
      const roomId = generateRoomId();
      waiting.push({socketId: socket.id, roomId});
      const maze = generateMaze(86, 40) // TODO: Generalize this;
      mazes[roomId] = maze;
      activeGames.push({
        roomId,
        p1Id: socket.id,
        p2Id: '',
        timeRemaining: 300,
        p1Coins: 0,
        p2Coins: 0,
        p1Towers: [],
        p2Towers: [],
        p1Minions: [],
        p2Minions: [],
      })
      console.log('generated room id', roomId)
      io.to(socket.id).emit('receive room id', roomId, 'p1');
      socket.join(roomId);
    })

    socket.on('join', (roomId) => {
      const found = waiting.find(room => room.roomId === roomId);
      if (found) {
        socket.join(roomId);
        const game = activeGames.find(game => game.roomId === roomId);
        game.p2Id = socket.id;
        io.to(socket.id).emit('receive room id', roomId, 'p2');
      }
    })

    socket.on('play', () => {
      console.log({playerSearch});
      if (playerSearch.length !== 0) {
        const game = playerSearch.pop();
        console.log(game);
        const roomId = game.roomId;
        console.log('joining room', roomId);
        io.to(socket.id).emit('receiveRoomId', roomId, 'p2');
        socket.join(roomId);
        // io.to(socket.id).emit('set player 2');
      } else {
        const roomId = generateRoomId();
        console.log({socket});
        io.to(socket.id).emit('receiveRoomId', roomId, 'p1');
        console.log('creating room', roomId);
        playerSearch.push({socketId: socket.id, roomId});
        const maze = generateMaze(86, 40);
        mazes[roomId] = maze;
        console.log({mazes});
        // io.to(socket.id).emit('set player 1', 'p1');
        console.log('sending room id');
        console.log('room id sent');
        socket.join(roomId);
        
      }
    });

    socket.on('ready', (roomId) => {
      console.log('roomId ready', roomId);
      if (ready[roomId]) {
        delete ready[roomId];
        io.to(roomId).emit('Game start');
      } else {
        ready[roomId] = 1;
      }
    })

    socket.on('new minion', (type, roomId) => {
      console.log('new minion', type, roomId);
        socket.to(roomId).emit('new minion', type);
    });
    socket.on('minion move', (direction, minionId, roomId) => {
        socket.to(roomId).emit('minion move', direction, minionId);
    });

    socket.on('enterTower', (towerId, minionId, roomID) => {
        socket.to(roomID).emit('enterTower', towerId, minionId)
    })

    socket.on('clear waiting', () => {
      console.log('clearing waiting');
      clearRoomsBySocket(socket);
    })

    socket.on('disconnect', ()=>{
      clearRoomsBySocket(socket);
      console.log('a user disconnected')
    })
  })
}

