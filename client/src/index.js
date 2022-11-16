import React from 'react';
import ReactDOM from 'react-dom/client';
import { connect } from 'socket.io-client';
import './styles/index.css';
import App from './main/App';

const socket = connect('http://localhost:5000');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App socket={socket} />
    </React.StrictMode>
);