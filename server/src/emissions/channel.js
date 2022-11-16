import { getChannels } from '../repositories/channel.js';

export const list = (io, socket) => {
    const target = !!socket.data?.user?.name ? socket.data.user.name : socket.id;
    io.to(socket.id).emit('channel list', getChannels());
    console.log(`${Date.now()} ${socket.id} Sending list of channels to ${target}`);
};

export const joined = (io, socket, channelName, userName) => {
    io.to(channelName).emit('channel joined', channelName, userName);
    console.log(`${Date.now()} ${socket.id} User ${userName} joined channel "${channelName}"`);
};

export const notJoined = (io, socket, channel) => {
    io.to(socket.id).emit('not joined', channel);
    console.log(`${Date.now()} ${socket.id} Socket ${socket.id} failed to join channel "${channel}". User name undefined.`);
};

export const history = (socket, channel, history) => {
    socket.emit('channel history', history);
    console.log(`${Date.now()} ${socket.id} request message history of "${channel}". Size = ${Array(history).length}`);
};

export const left = (io, socket, channel, userName) => {
    io.to(channel).emit('channel left', channel, userName);
    console.log(`${Date.now()} ${socket.id} User ${userName} left channel "${channel}"`);
};

export const message = (io, channelName, message) => {
    io.to(channelName).emit('message from channel', channelName, message);
    console.log(`${Date.now()} To channel "${channelName}", user "${message.user.name}" send "${message.text}"`);
};