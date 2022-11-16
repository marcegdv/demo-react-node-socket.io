export const channelNamesList = (io) => {
    const channels = io.sockets.adapter.rooms;
    const channelNames = [];
    channels.forEach((value, key) => {
        const members = [];
        value.forEach((value) => members.push(value));
        channelNames.push({ name: key, members: members });
    });
    return channelNames;
};