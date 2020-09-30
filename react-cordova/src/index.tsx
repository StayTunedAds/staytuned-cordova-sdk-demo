import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@staytuned-io/cordova-components/loader';
import Staytuned from '@staytuned-io/cordova-typescript';

const renderReactDom = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),
    );
};

if ((window as any).cordova) {
    document.addEventListener(
        'deviceready',
        async () => {
            await Staytuned.getInstance().init('de03f2b8-ef81-428e-a20c-fb5becf32cad', 'dda710aa.74ff4f0a-cf6b-4db1-9345-e88862ca7ce9');
            renderReactDom();
        },
        false,
    );
} else {
    renderReactDom();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

defineCustomElements();
