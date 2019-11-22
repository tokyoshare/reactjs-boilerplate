import { ActionTypes } from "../../constants";

var initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.GET_ERROR_DATA:
            state = {
                ...state,
                message: action.message
            };
            break;
        case ActionTypes.UPDATE_USER_INFO: {
            state = {
                ...state,
                user: { ...action.user },
                token: action.token
            }
            break;
        }
    }
    return state;
};
