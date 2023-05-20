import express from 'express';
import http from 'http';
import { Server as SocketIOServer} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection',(socket) => {
    console.log("A user is connected");
});

io.on('disconnect', () => {
    console.log('A user disconnected');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server is listerning on port ${PORT}`)
})
