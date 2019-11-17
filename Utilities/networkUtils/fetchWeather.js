import API from "./API";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const fetchWeather = async state => {
    try {
        const { units, currLocation, location } = state;
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
        return data;
    } catch (err) {
        return err.message;
    }
};
