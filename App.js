import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import API from "./API";
import parseData from "./Utilities/formatWeather";

export default class App extends React.Component {
  state = {
    weatherForcast: []
  };
  componentDidMount() {
    this.fetchWeatherData();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.weatherForcast.map(dailyForcast => (
          <Text key={dailyForcast} style={styles.forecast}>
            {dailyForcast}
          </Text>
        ))}
      </ScrollView>
    );
  }

  async fetchWeatherData() {
    const key = API[0];
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=Delhi&key=${key}`
    );
    const { data } = await response.json();
    this.setState({
      weatherForcast: parseData(data)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  forecast: {
    padding: 10,
    fontSize: 20
  }
});
