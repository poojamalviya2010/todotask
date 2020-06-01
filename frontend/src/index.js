import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/scss/style.scss';

// const App = require('./app').default;

ReactDOM.render( 
	<App /> , document.getElementById('root')
);

serviceWorker.unregister();