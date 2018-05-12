import {combineReducers} from "redux";
import {GET_ALL_CATEGORIES} from "../actions";

function categories(state = {}, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return state
        default:
            return state
    }
}

export default combineReducers({categories})