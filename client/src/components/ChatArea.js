const ChatArea = (props) => {

    const { hide, children } = props;

    return (
        <>
            {!hide && <div style={styles.container}>
                {children ?? ''}
            </div>}
        </>
    );
};

export default ChatArea;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '8px',
        width: '100%',
    },
};