import http from 'http';
import { Server } from 'socket.io';
import crypto from 'crypto';
import { remove } from 'cypress/types/lodash';
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
  let playerSearch: {socketId: string, roomId: string}[] = [];
  let activeGames: {
    roomId: string,
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

  function clearRoomsBySocket(socketId) {
    playerSearch = playerSearch.filter(room => room.socketId !== socketId);
    waiting = waiting.filter(room => room.socketId !== socketId);
  }

  io.on('connection', socket => {
    console.log('user connected');
    socket.on('host', () => {
      const roomId = generateRoomId();
      waiting.push({socketId: socket.id, roomId});
      const maze = generateMaze(86, 40) // TODO: Generalize this;
      mazes[roomId] = maze;
      socket.join(roomId);
      io.to(socket.id).emit('receive room id', roomId);
    })

    socket.on('join', (roomId) => {
      const found = waiting.find(room => room.roomId === roomId);
      if (found) {
        socket.join(roomId);
        io.to(socket.id).emit('receive room id', roomId);
        io.to(socket.id).emit('set player 2');
        io.to(roomId).emit('Game start');
      }
    })

    socket.on('play', () => {
      if (playerSearch.length !== 0) {
        const roomId = playerSearch.pop().roomId;
        socket.join(roomId);
        io.to(socket.id).emit('receive room id', roomId);
        io.to(socket.id).emit('set player 2');
        io.to(roomId).emit('Game start');
      } else {
        const roomId = generateRoomId();
        playerSearch.push({socketId: socket.id, roomId});
        const maze = generateMaze(86, 40);
        mazes[roomId] = maze;
        socket.join(roomId);
        io.to(socket.id).emit('receive room id', roomId);
      }
    });

    socket.on('new minion', (type, roomId) => {
        socket.to(roomId).emit('new minion', type);
    });
    socket.on('minion move', (direction, minionId, roomId) => {
        socket.to(roomId).emit('minion move', direction, minionId);
    });

    socket.on('enterTower', (towerId, minionId, roomID) => {
        socket.to(roomID).emit('enterTower', towerId, minionId)
    })

    socket.on('clear waiting', () => {
      clearRoomsBySocket(socket.id);
    })

    socket.on('disconnect', ()=>{
      clearRoomsBySocket(socket.id);
      console.log('a user disconnected')
    })
  })
}

