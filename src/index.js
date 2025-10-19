import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import './style/_variables.scss';
import './style/media.scss';
import './style/button.scss';
import App from './components/app/App';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
