import { ActionTypes } from "../../constants";

var initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            state = {
                ...state,
                users: action.users
            };
            break;
    }
    return state;
};
