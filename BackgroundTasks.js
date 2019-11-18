import { AsyncStorage } from "react-native";
import * as Keys from "./preferenceKeys";
import { fetchWeather } from "./Utilities/networkUtils/fetchWeather";
import {
    extractFieldsFromJson,
    formatData
} from "./Utilities/jsonUtils/formatWeather";
import { insert } from "./Utilities/dbUtils/DbHelper";
import showNotification from "./Utilities/uiUtils/Notifications";

const loadWeatherinBackground = async () => {
    const preferences = await AsyncStorage.multiGet([
        Keys.unitsKey,
        Keys.locationKey,
        Keys.currentLocationKey
    ]);
    let state = {};
    preferences.forEach(preference => {
        state[preference[0]] = preference[1];
    });
    console.log(state);
    let data = await fetchWeather(state);
    if (typeof data !== "string") {
        data = extractFieldsFromJson(data);
        const weatherUnit = state[Keys.unitsKey] === "Metric" ? "℃" : "℉";
        data = formatData(data, weatherUnit);
        insert(data, state[Keys.unitsKey]);
        showNotification(data[0]);
    }
};

export default loadWeatherinBackground;
