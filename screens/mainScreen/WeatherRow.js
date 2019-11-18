import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";

const WeatherRow = props => {
    const { date, description, max_temp, min_temp, icon } = props.summary;
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() =>
                props.navigation.navigate("detail", { summary: props.summary })
            }>
            <View style={styles.row}>
                <View style={[styles.row, styles.largeSection]}>
                    <Image source={icon} style={styles.icon} />
                    <View>
                        <Text>{date}</Text>
                        <Text>{description}</Text>
                    </View>
                </View>
                <View style={[styles.row, styles.smallSection, styles.spaced]}>
                    <Text style={styles.temperature}>{max_temp}</Text>
                    <Text style={styles.temperature}>{min_temp}</Text>
                </View>
            </View>
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
        padding: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    largeSection: {
        width: "65%"
    },
    smallSection: {
        width: "35%"
    },
    spaced: {
        justifyContent: "space-between"
    },
    icon: {
        width: 45,
        height: 45,
        marginRight: 20
    },
    temperature: {
        fontSize: 20
    }
});

export default WeatherRow;
