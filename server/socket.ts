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

  let waiting: string[] = [];
  let playerSearch: string[] = [];
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
  io.on('connection', socket => {
    console.log('user connected');
    socket.on('host', () => {
      const roomId = generateRoomId();
      waiting.push(roomId);
      const maze = generateMaze(86, 40) // TODO: Generalize this;
      mazes[roomId] = maze;
      socket.join(roomId);
      io.to(socket.id).emit('receive room id', roomId);
    })

    socket.on('join', (roomId) => {
      if (waiting.includes(roomId)) {
        socket.join(roomId);
        io.to(socket.id).emit('receive room id', roomId);
        io.to(socket.id).emit('set player 2');
        io.to(roomId).emit('Game start');
      }
    })
    socket.on('play', () => {
      if (playerSearch.length !== 0) {
        const roomId = playerSearch.pop() as string;
        socket.join(roomId);
        io.to(socket.id).emit('receive room id', roomId);
        io.to(socket.id).emit('set player 2');
        io.to(roomId).emit('Game start');
      } else {
        // const roomId = generateRoomId();
        playerSearch.push(socket.id);
        const maze = generateMaze(86, 40);
        io.to(socket.id).emit('set player 1');
        mazes[socket.id] = maze;
        socket.join(socket.id);
        io.to(socket.id).emit('receive room id', socket.id);
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

    socket.on('clear waiting', (socketId) => {
      console.log(playerSearch)
      if(playerSearch[0]=== socketId) {
        playerSearch.pop()
      }
      console.log(playerSearch)
    })

    socket.on('disconnect', ()=>{
      console.log(playerSearch)
      if(playerSearch[0] && playerSearch[0] === socket.id){
          playerSearch.pop()
      }
      console.log(playerSearch)
      console.log('a user disconnected')
    })
  })
}
