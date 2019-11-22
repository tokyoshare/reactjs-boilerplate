import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { reducers } from "../reducers";
import { history } from "../../utils/History";
import thunk from "redux-thunk";
import { asyncDispatchMiddleware } from "redux/middleware/middleware";

const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export function configureStore() {
    return createStore(reducers, composeEnhancers(applyMiddleware(middleware, thunk, asyncDispatchMiddleware)));
}
