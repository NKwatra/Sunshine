import { fetchWeather } from "../Utilities/networkUtils/fetchWeather";
import {
    parseData,
    extractFieldsFromJson,
    parseDbData
} from "../Utilities/jsonUtils/formatWeather";
import { insert, read } from "../Utilities/dbUtils/DbHelper";

export const UPDATE_UNITS = "updateUnits",
    UPDATE_CURR_LOCATION = "updateCurrentLocation",
    UPDATE_LOCATION = "updateLocation",
    UPDATE_LOADING = "updateLoading",
    UPDATE_ERROR = "updateError",
    UPDATE_WEATHER = "updateWeather";

export const updateUnitsAction = newUnits => ({
    type: UPDATE_UNITS,
    payload: {
        units: newUnits
    }
});

export const updateCurrLocationAction = permission => ({
    type: UPDATE_CURR_LOCATION,
    payload: {
        permission: permission
    }
});

export const updateLocationAction = newLocation => ({
    type: UPDATE_LOCATION,
    payload: {
        location: newLocation
    }
});

export const updateLoadingAction = newLoadingStatus => ({
    type: UPDATE_LOADING,
    payload: {
        loading: newLoadingStatus
    }
});

export const updateErrorAction = (
    newErrorStatus,
    errorMessage,
    newLoadingStatus
) => ({
    type: UPDATE_ERROR,
    payload: {
        error: newErrorStatus,
        errorMessage: errorMessage,
        loading: newLoadingStatus
    }
});

export const updateWeatherAction = (newForecast, newLoadingStatus) => ({
    type: UPDATE_WEATHER,
    payload: {
        weatherForecast: newForecast,
        loading: newLoadingStatus
    }
});

export const fetchNewWeather = () => {
    return async (dispatch, getState) => {
        dispatch(updateLoadingAction(true));
        const state = getState();
        const value = await fetchWeather(state);
        if (typeof value === "string") {
            return dispatch(updateErrorAction(true, value, false));
        } else {
            const data = extractFieldsFromJson(value);
            insert(data, state.units);
            return dispatch(
                updateWeatherAction(parseData(value, state.units), false)
            );
        }
    };
};
