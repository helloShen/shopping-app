import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../css/index.css';

const root = ReactDOM.createRoot(
    document.querySelector('.root') as Element,
);
root.render(<App />);
