import { useEffect, useState } from "react";
import Channels from "../components/Channels";
import ChatArea from "../components/ChatArea";
import InputMessage from "../components/InputMessage";
import Name from "../components/Name";

import { storage } from "../storage/storage";

const ss = storage();

const EVENTS = {
    connect: 'connect',
    nameSaved: 'name saved',
    nameChanged: 'name changed',
    invalidName: 'invalid name',
    channelList: 'channel list',
    channelJoined: 'channel joined',
    notJoined: 'not joined',
    channelHistory: 'channel history',
    channelLeft: 'channel left',
    messageFromChannel: 'message from channel',
};
const EMISSIONS = {
    setName: 'set name',
    channelList: 'channel list',
    joinChannel: 'join channel',
    channelHistory: 'channel history',
    leaveChannel: 'leave channel',
    messageToChannel: 'message to channel',
};

const App = (props) => {
    const { socket } = props;

    const [online, setOnline] = useState(socket.connected);
    const [myName, setMyName] = useState('');
    const [channels, setChannels] = useState([]);
    const [target, setTarget] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    ss.setOnline(online);
    ss.setMyName(myName);
    ss.setChannels(channels);
    ss.setTarget(target);
    ss.setMessages(messages);
    ss.setMessage(message);

    useEffect(() => {
        ss.setTarget(target);
        socket.emit(EMISSIONS.channelHistory, target);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    useEffect(() => {
        ss.setMessages(messages);
    }, [messages]);

    useEffect(() => {
        const eventList = socketEvents(socket, EVENTS, EMISSIONS);
        return () => eventList.forEach(eventName => socket.off(eventName));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Donde se procesan todos los eventos/mensajes que envía el servidor
    const socketEvents = (socket, events, emissions) => {
        socket.on(events.connect, () => {
            setOnline(previousOnlineStatus => true);
            socket.emit(emissions.channelList);
        });

        socket.on(events.channelList, (list) => {
            setChannels(previousChannelList => [...list])
        });

        socket.on(events.nameSaved, (newName) => {
            setMyName(previousName => newName);
        });
        socket.on(events.invalidName, () => {
            alert('¡No definiste tu nombre o apodo!');
        });

        socket.on(events.channelJoined, (channelName, userName) => {
            if (ss.getMyName() === userName) {
                setTarget(previousTarget => channelName);
            };
        });
        socket.on(events.notJoined, (channel) => {
            alert(`Para chatear en ${channel} primero define tu nombre o apodo.`);
        })
        socket.on(events.channelHistory, (history) => {
            setMessages(previousMessages => [...history]);
        });
        socket.on(events.messageFromChannel, (channelName, newMessage) => {
            setMessages(previousMessages => [...previousMessages, newMessage]);
        });
        socket.on(events.leaveChannel, (channelName, userName) => {
            if (ss.getMyName() === userName) {
                setTarget(p => '');
            };
        });

        return Object.values(events);
    };

    const handleClickSetName = (newName) => {
        if (ss.getMyName() !== newName) {
            socket.emit(EMISSIONS.setName, newName);
        };
    };
    const handleClickChannel = (channelName) => {
        if (ss.getTarget() !== channelName) {
            socket.emit(EMISSIONS.leaveChannel, target);
            socket.emit(EMISSIONS.joinChannel, channelName);
        };
    };
    const handleClickSendMessage = (messageToSend) => {
        const newMessage = {
            user: {
                id: '',
                name: ss.getMyName(),
            },
            text: messageToSend,
        };
        socket.emit(EMISSIONS.messageToChannel, ss.getTarget(), newMessage);
        setMessage(previousMessage => '');
    };

    if (!online) return (
        <div style={styles.offline}>
            <h2>Esperando servidor... </h2>
            <img src='/loading-50.webp' width='40px' height='40px' alt='' />
        </div>
    );
    return (
        <div style={styles.container}>
            <Name name={ss.getMyName()} setName={handleClickSetName} />
            <div style={styles.main}>
                <Channels channels={channels} onClick={handleClickChannel} selected={ss.getTarget()} />
                <ChatArea hide={!!!ss.getTarget()}>
                    <div style={styles.messages}>
                        {
                            ss.getMessages().map((message, index) => {
                                if (!!message.user.name) {
                                    return (
                                        <p key={`pidx${index}`}>{message.user.name}: {message.text}</p>
                                    );
                                } else {
                                    return (
                                        <p key={`pidx${index}`}>{message.text}</p>
                                    );
                                };
                            })
                        }
                    </div>
                    <InputMessage message={message} onClick={handleClickSendMessage} />
                </ChatArea>
            </div>
        </div>
    );
};

export default App;

const styles = {
    offline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#dd0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px',
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
    },
    messages: {
        backgroundColor: '#222',
        color: '#ddd',
        padding: '8px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        overflow: 'auto',
    },
};