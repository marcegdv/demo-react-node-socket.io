import Channel from "./Channel";

const Channels = (props) => {
    const { channels, onClick, selected } = props;

    return (
        <div style={styles.container}>
            <div style={styles.title}>
                Chats
            </div>
            <div style={styles.list}>
                {channels.map(
                    (channel, index) =>
                        <div
                            style={styles.itemWrapper}
                            key={`chnl${index}`}
                            onClick={() => onClick(channel)}
                        >
                            <Channel
                                key={`chni${index}`}
                                onClick={onClick}
                                name={channel}
                                active={selected === channel}
                            />
                        </div>
                )}
            </div>
        </div>
    );
};

export default Channels;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        backgroundColor: '#333',
        color: '#ddd',
        padding: '8px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        width: '320px',
    },
    title: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#dd7',
        width: '100%',
        borderBottom: '1px solid #777',
        paddingBottom: '8px',
    },
    list: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
    },
    itemWrapper: {
        cursor: 'pointer',
    },
};