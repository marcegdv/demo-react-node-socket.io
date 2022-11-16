import * as emit from '../emissions/user.js';

export const connection = (socket) => {
    socket.data.user = {
        id: '',
        name: '',
    };
    console.log(`${Date.now()} Nuevo socket.id = ${socket.id}`);
};

export const disconnection = (socket) => {
    console.log(`${Date.now()} Socket.id = ${socket.id} desconentado.`);
};

export const setName = (io, socket, name) => {
    const validName = String(name).trim();
    if (!!validName) {
        const oldName = socket.data.user.name;
        socket.data.user.name = validName;
        emit.saved(io, socket, oldName);
    } else {
        emit.invalid(socket, name);
    };
};