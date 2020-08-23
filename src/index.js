import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom";
import App from "./App";
import {enableLogging} from 'mobx-logger';
import * as serviceWorker from "./serviceWorker";
import AuctionStore from "./stores/AuctionStore";
import AuthStore from "./stores/AuthStore";
import OverlayStore from "./stores/OverlayStore";
import history from "./utils/history";
import "./normalize.scss";

enableLogging()
ReactDOM.render(
  <Provider
    auctionStore={AuctionStore}
    authStore={AuthStore}
    routerHistory={history}
    overlayStore={OverlayStore}
  >
      <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
