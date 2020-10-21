import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { applyPolyfills, defineCustomElements } from "@staytuned-io/cordova-components/loader";
import Staytuned from "@staytuned-io/cordova-typescript";
import 'core-js/es/map'
import 'core-js/es/set'
import 'core-js/es/symbol' 

const renderReactDom = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root")
    );
};

if ((window as any).cordova) {
    document.addEventListener(
        "deviceready",
        async () => {
            try {
                await Staytuned.getInstance().init("fc921b10-9371-45ba-af97-17b9ee05033b", "cf21bc55.e88d6f2e-9295-4ea9-bcd9-51057492cab8");
            } catch (err) {
                console.warn("already init");
            }
            renderReactDom();
        },
        false
    );
} else {
    renderReactDom();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

defineCustomElements();
applyPolyfills();
