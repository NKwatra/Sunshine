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

export default class MainScreen extends React.Component {
    state = {
        weatherForcast: [],
        loading: true,
        error: false
    };
    componentDidMount() {
        this.fetchWeatherData();
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
                    <Text>
                        Oops! there seems to be an error loading data, please
                        check your internet connection
                    </Text>
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
            const response = await fetch(
                `https://api.weatherbit.io/v2.0/forecast/daily?city=Delhi&key=${key}`
            );
            const { data } = await response.json();
            this.setState({
                weatherForcast: parseData(data),
                loading: false
            });
        } catch {
            this.setState({
                error: true
            });
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
        alignItems: "center"
    }
});
