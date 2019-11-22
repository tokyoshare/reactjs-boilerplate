import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store/configureStore";
import { history } from "./utils/History";
import "./static/styles/index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'rc-pagination/assets/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
);
