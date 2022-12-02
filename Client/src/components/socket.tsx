import {useEffect, useState} from 'react';
import socket from '../services/socket';

export default function Socket() {

  const[id, setId] = useState('');

  useEffect(() => {
    socket.on('Game start', () => {
      console.log('Game started');
    })
  }, [])

  function hostRoom() {
    socket.emit('host', socket.id);
    console.log('socket.id', socket.id);
    setId(socket.id);
  }

  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      join: {value: string};
    }
    const room = target.join.value; 
    socket.emit('join', room);
  }

  return (
    <form onSubmit={joinRoom}>
      <button type='button' onClick={hostRoom}>Create</button>
      <h1>{id}</h1>
      <input name='join' type="text" placeholder='Enter room ID' required/><button>Join</button>
    </form>
  );
}
