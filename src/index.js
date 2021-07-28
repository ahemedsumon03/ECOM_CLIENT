import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/assets/css/fontawesome.css'
import '../src/assets/css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/style.css'
import '../src/assets/css/placeholder-loading.min.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
