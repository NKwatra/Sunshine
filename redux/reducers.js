import * as Actions from "./actions";
import { combineReducers } from "redux";

const unitsReducer = (state = "Metric", action) => {
    if (action.type === Actions.UPDATE_UNITS) {
        return action.payload.units;
    }
    return state;
};

const currLocationReducer = (state = true, action) => {
    if (action.type === Actions.UPDATE_CURR_LOCATION) {
        return action.payload.permission;
    }
    return state;
};

const locationReducer = (state = "Not set", action) => {
    if (action.type === Actions.UPDATE_LOCATION) {
        return action.payload.location;
    }
    return state;
};

export default combineReducers({
    units: unitsReducer,
    currLocation: currLocationReducer,
    location: locationReducer
});
