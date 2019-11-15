import React from "react";
import {
    View,
    ScrollView,
    StatusBar,
    ProgressBarAndroid,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import WeatherRow from "./WeatherRow";
import API from "./API";
import parseData from "../../Utilities/formatWeather";
import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import {
    unitsKey,
    currentLocationKey,
    locationKey
} from "../../preferenceKeys";
import * as Location from "expo-location";

export default class MainScreen extends React.Component {
    state = {
        weatherForcast: [],
        loading: true,
        error: false,
        errorMessage:
            "Seems like you are not connected to internet, please check your connection and try again"
    };

    componentDidMount() {
        this.intializePreferences().then(() => {
            this.fetchWeatherData();
        });
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.centredContent}>
                    {/* TODO : Find a better alternative to show loading on ios devices */}
                    <StatusBar
                        networkActivityIndicatorVisible={this.state.loading}
                    />
                    <ProgressBarAndroid
                        color="red"
                        animating={this.state.loading}
                        style={styles.progressBar}
                    />
                </View>
            );
        } else if (this.state.error) {
            return (
                <View style={styles.centredContent}>
                    <Text>{this.state.errorMessage}</Text>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.weatherForcast}
                        renderItem={({ item }) => (
                            <WeatherRow
                                summary={item}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={item => item}
                    />
                </ScrollView>
            );
        }
    }

    async fetchWeatherData() {
        try {
            const key = API[0];
            const [units, location] = await AsyncStorage.multiGet([
                unitsKey,
                locationKey
            ]);
            let url = "https://api.weatherbit.io/v2.0/forecast/daily?";
            if (
                (await Permissions.getAsync(Permissions.LOCATION)).status ===
                "granted"
            ) {
                if (await Location.hasServicesEnabledAsync()) {
                    let {
                        coords: { longitude, latitude }
                    } = await Location.getCurrentPositionAsync({});
                    url += `&lat=${latitude}&lon=${longitude}`;
                } else {
                    throw new Error("Enable location services");
                }
            } else {
                if (location[1] === "Not Set")
                    throw new Error("location not available");
                else url += `city=${location[1].replace(" ", "+")}`;
            }
            url += units[1] === "Metric" ? "&units=M" : "&units=I";
            url += `&key=${key}`;
            const response = await fetch(url);
            const { data } = await response.json();
            this.setState({
                weatherForcast: parseData(data),
                loading: false
            });
        } catch (err) {
            console.log(err.message);
            let errorMessage =
                err.message === "location not available"
                    ? "No location set to search weather"
                    : "Please enable location services from settings";
            this.setState({
                error: true,
                loading: false,
                errorMessage: errorMessage
            });
        }
    }

    async intializePreferences() {
        let keys = await AsyncStorage.getAllKeys();
        if (keys.length === 0) {
            let data = [[unitsKey, "Metric"]];
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === "granted") {
                data.push([currentLocationKey, "true"]);
            } else {
                data.push([currentLocationKey, "false"]);
                alert(
                    "Please Set up location manualy then from the settings tab"
                );
            }
            data.push([locationKey, "Not Set"]);
            await AsyncStorage.multiSet(data);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centredContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    }
});
