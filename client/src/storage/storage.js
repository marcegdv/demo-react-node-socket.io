const st = window.sessionStorage;

export const storage = () => {
    return {
        setOnline: (online) => st.setItem('online', online),
        setMyName: (myName) => st.setItem('myName', myName),
        setChannels: (channels) => st.setItem('channels', JSON.stringify(channels)),
        setTarget: (target) => st.setItem('target', target),
        setMessages: (messages) => st.setItem('messages', JSON.stringify(messages)),
        setMessage: (message) => st.setItem('message', message),

        getOnline: () => st.getItem('online'),
        getMyName: () => st.getItem('myName'),
        getChannels: () => JSON.parse(st.getItem('channels')),
        getTarget: () => st.getItem('target'),
        getMessages: () => JSON.parse(st.getItem('messages')),
        getMessage: () => st.getItem('message'),
    };
};