import * as emit from '../emissions/channel.js';
import { defaultChannels } from '../repositories/channel.js';
import { addMessage } from '../repositories/chat.js';

export const list = (io, socket) => {
    emit.list(io, socket);
};

export const join = (io, socket, channelName) => {
    const userName = socket.data?.user?.name;
    if (!!userName) {
        const user = { id: '', name: '' };
        const msg = { user: user, text: `- ${userName} se unió al canal -`};
        socket.join(channelName);
        message(io, channelName, msg)
        emit.joined(io, socket, channelName, userName);
    } else {
        emit.notJoined(io, socket, channelName);
    };
};

export const history = (socket, channelName) => {
    if (Object.keys(defaultChannels).includes(channelName)) {
        emit.history(socket, channelName, defaultChannels[channelName]);
    };
};

export const leave = (io, socket, channelName) => {
    const userName = socket.data?.user?.name;
    if (!!userName) {
        const user = { id: '', name: '' };
        const msg = { user: user, text: `- ${userName} dejó el canal -`};
        socket.leave(channelName);
        message(io, channelName, msg)
    emit.left(io, socket, channelName, userName);
};
};

export const message = (io, channelName, message) => {
    if (Object.keys(defaultChannels).includes(channelName)) {
        defaultChannels[channelName].push(message);
    };
    emit.message(io, channelName, message);
};