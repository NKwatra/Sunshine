import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const WeatherRow = props => {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate("detail")}>
            <Text style={styles.forecast}>{props.summary}</Text>
            <View style={styles.line}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    line: {
        backgroundColor: "gray",
        height: 1
    },
    forecast: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20
    },
    item: {
        paddingLeft: 20,
        paddingRight: 20
    }
});

export default WeatherRow;
