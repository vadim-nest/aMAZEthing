
import http from 'http';
import { Server } from 'socket.io';

export default function Connect (server: http.Server) {
    const io = new Server(server, {cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST'],
        credentials: true
    }});
    io.on('connection', socket => {
        console.log('user connected');
    })
}