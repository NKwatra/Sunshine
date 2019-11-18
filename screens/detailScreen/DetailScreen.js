import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ShareIcon from "./ShareIcon";
import Row from "./Row";

// TODO : (optinal) style the text to be shared
export default class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#f4511e"
            },
            headerRight: () => (
                <ShareIcon
                    message={navigation.getParam(
                        "summary",
                        "No Information available"
                    )}
                />
            )
        };
    };

    render() {
        const summary = this.props.navigation.getParam("summary");
        console.log(this.props);
        return (
            <View>
                <TouchableOpacity style={styles.largeWeatherContainer}>
                    <View>
                        <Text style={[styles.textCenter, styles.date]}>
                            {summary.date}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <View>
                                <Image
                                    source={summary.icon}
                                    style={styles.largeIcon}
                                />
                                <Text style={styles.textCenter}>
                                    {summary.description}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.halfWidth,
                                styles.centredContent,
                                styles.largeWeatherContainer
                            ]}>
                            <Text style={[styles.textCenter, styles.largeText]}>
                                {summary.max_temp}
                            </Text>
                            <Text style={[styles.textCenter, styles.MinTemp]}>
                                {summary.min_temp}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Row type={"Humidity"} value={summary.humidity} unit={"%"} />
                <Row type={"Pressure"} value={summary.pressure} unit={"mb"} />
                <Row
                    type={"Wind Speed"}
                    value={summary.wind}
                    unit={this.props.units === "Metric" ? "m/s" : "mph"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        width: 180,
        height: 180,
        marginLeft: "5%"
    },
    largeText: {
        fontSize: 50
    },
    MinTemp: {
        marginTop: 10
    },
    date: {
        marginTop: 10,
        fontSize: 25
    },
    largeWeatherContainer: {
        paddingTop: 50
    }
});
