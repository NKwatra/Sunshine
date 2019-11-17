import API from "../Utilities/API";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import parseData from "../Utilities/formatWeather";

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

export const updateErrorAction = (newErrorStatus, errorMessage) => ({
    type: UPDATE_ERROR,
    payload: {
        error: newErrorStatus,
        errorMessage: errorMessage
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
        try {
            const { units, currLocation, location } = getState();
            const key = API[0];
            let url = "https://api.weatherbit.io/v2.0/forecast/daily?";
            if (
                (await Permissions.getAsync(Permissions.LOCATION)).status ===
                    "granted" &&
                currLocation === "true"
            ) {
                if (await Location.hasServicesEnabledAsync()) {
                    let {
                        coords: { longitude, latitude }
                    } = await Location.getCurrentPositionAsync({});
                    url += `lat=${latitude}&lon=${longitude}`;
                } else {
                    throw new Error("Enable location services");
                }
            } else {
                if (location === "Not Set")
                    throw new Error("location not available");
                else url += `city=${location}`;
            }
            url += units === "Metric" ? "&units=M" : "&units=I";
            url += `&key=${key}`;
            const response = await fetch(url);
            const { data } = await response.json();
            return dispatch(updateWeatherAction(parseData(data, units), false));
        } catch (err) {
            let errorMessage = err.message;
            return dispatch(updateErrorAction(true, errorMessage));
        }
    };
};
