export const UPDATE_UNITS = "updateUnits",
    UPDATE_CURR_LOCATION = "updateCurrentLocation",
    UPDATE_LOCATION = "updateLocation";

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
