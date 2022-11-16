import server from './src/server/index.js';

const PORT = 5000;

server.listen(PORT);

console.log(`Server HTTP/Socket.io listening on http://localhost:${PORT}\n`);