import React from "react";
import { View, ScrollView, Text, FlatList, StyleSheet } from "react-native";
import WeatherRow from "./WeatherRow";
import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import {
    unitsKey,
    currentLocationKey,
    locationKey
} from "../../preferenceKeys";
import LoadingIndicator from "../../Utilities/uiUtils/LoadingIndicator";

class MainScreen extends React.Component {
    componentDidMount() {
        this.intializePreferences().then(data => {
            this.props.updateUnits(data[0][1]);
            this.props.updateCurrLocation(data[1][1]);
            this.props.updateLocation(data[2][1]);
            this.props.updateWeather();
        });
    }
    render() {
        const {
            loading,
            weatherForecast,
            error,
            errorMessage
        } = this.props.mainScreen;
        if (loading) {
            return <LoadingIndicator loading={loading} />;
        } else if (error) {
            return (
                <View style={styles.centredContent}>
                    <Text>{errorMessage}</Text>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={weatherForecast}
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
            AsyncStorage.multiSet(data);
            return data;
        } else {
            const data = await AsyncStorage.multiGet([
                unitsKey,
                currentLocationKey,
                locationKey
            ]);
            return data;
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

export default MainScreen;
