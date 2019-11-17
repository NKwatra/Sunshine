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

const mainScreenLoadingReducer = action => {
    return action.payload.loading;
};

const mainScreenErrorReducer = action => {
    return { ...action.payload };
};

const mainScreenWeatherReducer = action => {
    return { ...action.payload };
};

const mainScreenReducer = (
    state = {
        loading: true,
        weatherForecast: [],
        error: false,
        errorMessage: undefined
    },
    action
) => {
    if (action.type === Actions.UPDATE_LOADING) {
        return { ...state, loading: mainScreenLoadingReducer(action) };
    } else if (action.type === Actions.UPDATE_ERROR) {
        return { ...state, ...mainScreenErrorReducer(action) };
    } else if (action.type === Actions.UPDATE_WEATHER) {
        return { ...state, ...mainScreenWeatherReducer(action) };
    } else return state;
};

export default combineReducers({
    units: unitsReducer,
    currLocation: currLocationReducer,
    location: locationReducer,
    mainScreen: mainScreenReducer
});
