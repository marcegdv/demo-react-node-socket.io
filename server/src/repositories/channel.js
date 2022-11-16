export const defaultChannels = {
    '#General': [
        {
            user: { id: '1234567890', name: '@admin' },
            text: 'Canal de temas diversos y de la libre expresión.',
        },
    ],
    '#Ayuda': [
        {
            user: { id: '1234567890', name: '@helpdesk' },
            text: 'Canal de consultas sobre la app de chat.',
        },
        {
            user: { id: '1234567890', name: '@helpdesk' },
            text: 'No se responden otro tipo de consultas.',
        },
    ],
};

export const getChannels = () => Object.keys(defaultChannels);