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
    playersLoaded: number,
    p1Coins: number,
    p2Coins: number,
    p1Towers: number[],
    p2Towers: number[],
    p1Minions: [number, animal][],
    p2Minions: [number, animal][],
  }[] = [];
  let intervals: {[roomId: string]: NodeJS.Timer} = {};

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
      if (intervals[room]) clearInterval(intervals[room]);
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

  function createNewGame(roomId: string, p1Id: string) {
    const maze = generateMaze(86, 40) // TODO: Generalize this;
    mazes[roomId] = maze;
    activeGames.push({
      roomId,
      p1Id,
      p2Id: '',
      playersLoaded: 0,
      timeRemaining: 300,
      p1Coins: 0,
      p2Coins: 0,
      p1Towers: [],
      p2Towers: [],
      p1Minions: [],
      p2Minions: [],
    })
  };

  function addP2ToGame(roomID: string, p2Id:string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.p2Id = p2Id;
  };

  function increaseLoadedGame(roomID: string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.playersLoaded++;
    if (game.playersLoaded === 2) return true;
    return false;
  }

  function decreaseGameTimer(roomID: string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.timeRemaining--;
    for (let tower of game.p1Towers) {
      addCoinsGame(roomID, 20, 'p1');
    }
    for (let tower of game.p2Towers) {
      addCoinsGame(roomID, 20, 'p2');
    }
    return game;
  }

  function addNewMinionGame(roomID: string, type: animal, player: 'p1' | 'p2') {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    const newEntry: [number, animal] = [game.p1Minions.length + game.p2Minions.length, type];
    if (player === 'p1') game.p1Minions.push(newEntry);
    else game.p2Minions.push(newEntry);
    return game;
  }

  function addCoinsGame(roomID: string, amount: number, player: 'p1' | 'p2') {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    if (player === 'p1') game.p1Coins += amount;
    else game.p2Coins += amount;
    return game;
  }

  function addTowerGame(roomID: string, towerID: number, player: 'p1' | 'p2') {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    if (player === 'p1') {
      game.p1Towers.push(towerID);
      game.p2Towers = game.p2Towers.filter(tower => tower !== towerID);
    } else {
      game.p2Towers.push(towerID);
      game.p1Towers = game.p1Towers.filter(tower => tower !== towerID);
    }
    return game;
  }

  function sendGameState(newGameState, roomId, io) {
    if (newGameState) {
      io.to(roomId).emit('updateGameState', {
        timeRemaining: newGameState.timeRemaining, 
        p1Coins: newGameState.p1Coins, 
        p2Coins: newGameState.p2Coins, 
        p1Towers: newGameState.p1Towers, 
        p2Towers: newGameState.p2Towers, 
        p1MinionCount: newGameState.p1Minions.length, 
        p2MinionCount: newGameState.p1Minions.length});
    }
  }

  io.on('connection', socket => {
    console.log('user connected');
    socket.on('host', () => {
      const roomId = generateRoomId();
      waiting.push({socketId: socket.id, roomId});
      createNewGame(roomId, socket.id)
      socket.join(socket.id);
      console.log('generated room id', roomId)
      socket.join(roomId);
      io.emit('receiveRoomId', roomId, 'p1');
    })

    socket.on('join', (roomId) => {
      const found = waiting.find(room => room.roomId === roomId);
      if (found) {
        socket.join(roomId);
        const game = activeGames.find(game => game.roomId === roomId);
        game.p2Id = socket.id;
        addP2ToGame(roomId, socket.id);
        io.to(socket.id).emit('receiveRoomId', roomId, 'p2');
      }
    })

    socket.on('play', () => {
      console.log({playerSearch});
      if (playerSearch.length !== 0) {
        const game = playerSearch.pop();
        console.log(game);
        const roomId = game.roomId;
        console.log('joining room', roomId);
        addP2ToGame(roomId, socket.id);
        io.to(socket.id).emit('receiveRoomId', roomId, 'p2');
        socket.join(roomId);
        // io.to(socket.id).emit('set player 2');
      } else {
        const roomId = generateRoomId();
        console.log({socket});
        io.to(socket.id).emit('receiveRoomId', roomId, 'p1');
        console.log('creating room', roomId);
        playerSearch.push({socketId: socket.id, roomId});
        createNewGame(roomId, socket.id);
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
    });

    socket.on('maze generated', roomId => {
      if (increaseLoadedGame(roomId)) {
        io.to(roomId).emit('maze generated');
        const intervalId = setInterval(() => {
          const newGameState = decreaseGameTimer(roomId);
          sendGameState(newGameState, roomId, io);
        }, 1000);
        intervals[roomId] = intervalId;
      }
    })


    socket.on('new minion', (type, roomId, player) => {
      console.log('new minion', type, roomId);
      socket.to(roomId).emit('new minion', type);
      const newGameState = addNewMinionGame(roomId, type, player);
    });
    socket.on('minion move', (direction, minionId, roomId) => {
        socket.to(roomId).emit('minion move', direction, minionId);
    });

    socket.on('enterTower', (towerId, minionId, roomID, player) => {
      socket.to(roomID).emit('enterTower', towerId, minionId);
      
    })
    
    socket.on('conquerTower', (roomID, towerId, firstCapture, player) => {
      let newGameState = addTowerGame(roomID, towerId, player);
      newGameState = addCoinsGame(roomID, 200, player);
      sendGameState(newGameState, roomID, io);
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

