import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Search from './utils/searchContext';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Search>
    <App />
    </Search>
);

