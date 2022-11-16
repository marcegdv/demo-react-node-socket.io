import { useState } from "react";

const Name = (props) => {
    const { name, setName } = props;
    const [value, setValue] = useState(name);

    return (
        <div style={styles.container}>
            <div style={styles.name}>
                <div>Mi nombre</div>
                <div style={styles.myName}>{name}</div>
            </div>
            <input
                type="text"
                placeholder="Ingresa tu nombre o apodo..."
                value={value}
                minLength={2}
                maxLength={16}
                onChange={(event) => setValue(event.target.value)}
                // contentEditable={true}
                style={styles.input}
            />
            <button
                style={styles.button}
                onClick={() => setName(value)}
                disabled={name === value}
            >
                Aplicar
            </button>
        </div>
    );
};

export default Name;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        backgroundColor: '#444',
        color: '#ddd',
        padding: '16px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        width: 'auto',
        maxHeight: 'fit-content',
    },
    name: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    myName: {
        color: '#7bf',
        fontWeight: '500',
    },
    input: {
        padding: '8px 16px',
        width: `calc(100% - 8px)`,
        backgroundColor: '#ddd',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        border: '2px solid #aaa',
        borderRadius: '32px',
    },
    button: {
        backgroundColor: '#19e',
        fontWeight: 'bold',
        color: '#000',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};