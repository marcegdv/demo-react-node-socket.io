export const saved = (io, socket, name) => {
    console.log(`${Date.now()} ${socket.id} User set name to ${socket.data.user.name}`);
    socket.emit('name saved', socket.data.user.name);
};

export const invalid = (socket) => {
    socket.emit('invalid name');
};