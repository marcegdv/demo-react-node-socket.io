import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import routes from '../routes/index.js';
import * as userEvents from '../events/user.js'
import * as channelEvents from '../events/channel.js';

const PING_TIME_OUT = 10000;

const server = express();
server.use(cors());
server.use(routes);

const httpServer = createServer(server);

const io = new Server(httpServer, {
    // si queremos setear cual es el máximo de espera para considerar la desconexión
    pingTimeout: Number(PING_TIME_OUT),
    // para poder acceder desde la app hecha en react
    cors: {
        origin: [
            "http://localhost:3000",
            "http://localhost:8080",
        ],
    },
});

// Escuchar eventos de conexión y luego los evento/mensajes que envíe el socket
io.on('connect', (socket) => {
    userEvents.connection(socket);

    socket.on('set name', (name) => userEvents.setName(io, socket, name));

    socket.on('channel list', () => channelEvents.list(io, socket));
    socket.on('join channel', (channelName) => channelEvents.join(io, socket, channelName));
    socket.on('channel history', (channel) => channelEvents.history(socket, channel));
    socket.on('message to channel', (channelName, message) => channelEvents.message(io, channelName, message));
    socket.on('leave channel', (channel) => channelEvents.leave(io, socket, channel));

    socket.on('disconnect', () => userEvents.disconnection(socket));
});

export default httpServer;