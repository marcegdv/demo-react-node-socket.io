import { defaultChannels } from "./channel.js";

export const getMessages = (target) => {
    if (target === 'General' || target === 'Ayuda') {
        return defaultChannels[target];
    } else {
        // return others messages?
    };
};

export const addMessage = (user, target, message) => {
    if (target === 'General' || target === 'Ayuda') {
        const newMessage = {
            user: user,
            message: message
        };
        defaultChannels[target].push(newMessage);
    } else {
        // save message for others channels?
    };
};

export const clearMessages = (target) => {
    if (target === 'General' || target === 'Ayuda') {
        defaultChannels[target] = [];
    } else {
        // return others messages?
    };
};