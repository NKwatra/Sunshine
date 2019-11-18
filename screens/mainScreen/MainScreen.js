import React from "react";
import {
    View,
    ScrollView,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Platform
} from "react-native";
import WeatherRow from "./WeatherRow";
import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import {
    unitsKey,
    currentLocationKey,
    locationKey
} from "../../preferenceKeys";
import LoadingIndicator from "../../Utilities/uiUtils/LoadingIndicator";
import { read } from "../../Utilities/dbUtils/DbHelper";
import { parseDbData } from "../../Utilities/jsonUtils/formatWeather";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../../Utilities/uiUtils/styles";

class MainScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor:
                Platform.OS === "android" ? Styles.colorPrimary : Styles.white
        },
        headerTitle: "Sunshine",
        headerTintColor: Platform.OS === "android" ? Styles.white : null,
        headerTitleStyle: {
            fontSize: 25,
            fontWeight: "500"
        }
    };

    componentDidMount() {
        this.intializePreferences().then(data => {
            this.props.updateUnits(data[0][1]);
            this.props.updateCurrLocation(data[1][1]);
            this.props.updateLocation(data[2][1]);
            this.props.updateLoading(true);
            read((result, error) => {
                if (result !== null && result.length > 0) {
                    const data = parseDbData(result, this.props.units);
                    this.props.updateForecast(data, false, false, "");
                } else {
                    this.props.updateWeather();
                }
            });
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
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("detail", {
                                summary: weatherForecast[0]
                            })
                        }
                        style={styles.todayTemperature}>
                        <View>
                            <Text
                                style={[
                                    styles.textCenter,
                                    styles.date,
                                    styles.whiteColor,
                                    styles.boldFont
                                ]}>
                                {weatherForecast[0].date}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <View>
                                    <Image
                                        source={weatherForecast[0].icon}
                                        style={styles.largeIcon}
                                    />
                                    <Text
                                        style={[
                                            styles.textCenter,
                                            styles.whiteColor,
                                            styles.boldFont
                                        ]}>
                                        {weatherForecast[0].description}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.halfWidth,
                                    styles.centredContent
                                ]}>
                                <Text
                                    style={[
                                        styles.textCenter,
                                        styles.largeText,
                                        styles.whiteColor
                                    ]}>
                                    {weatherForecast[0].max_temp}
                                </Text>
                                <Text
                                    style={[
                                        styles.textCenter,
                                        styles.MinTemp,
                                        styles.whiteColor
                                    ]}>
                                    {weatherForecast[0].min_temp}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={weatherForecast.slice(1, weatherForecast.length)}
                        renderItem={({ item }) => (
                            <WeatherRow
                                summary={item}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={item => item.date}
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
    },
    textCenter: {
        textAlign: "center",
        fontSize: 20
    },
    row: {
        flexDirection: "row"
    },
    halfWidth: {
        width: "50%"
    },
    largeIcon: {
        width: 100,
        height: 100,
        marginLeft: "20%"
    },
    largeText: {
        fontSize: 50,
        marginTop: 5
    },
    MinTemp: {
        marginTop: 10,
        fontWeight: "600"
    },
    date: {
        marginTop: 10,
        fontSize: 25
    },
    todayTemperature: {
        backgroundColor: Styles.colorPrimary,
        paddingTop: 16,
        paddingBottom: 16
    },
    whiteColor: {
        color: Styles.white
    },
    boldFont: {
        fontWeight: "600"
    }
});

export default MainScreen;
