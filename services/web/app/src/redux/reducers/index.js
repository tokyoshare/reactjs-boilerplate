import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import App from './_App';
import UserManagePage from "./_UserManagePage";

export const reducers = combineReducers({
    routing: routerReducer,
    App,
    UserManagePage
})

export const mapStateToProps = (state, props) => {
    return state;
}