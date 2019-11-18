import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import ShareIcon from "./ShareIcon";
import Row from "./Row";
import Styles from "../../Utilities/uiUtils/styles";

// TODO : (optinal) style the text to be shared
export default class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: Styles.colorPrimary
            },
            headerRight: () => (
                <ShareIcon
                    message={navigation.getParam(
                        "summary",
                        "No Information available"
                    )}
                />
            ),
            headerBackTitleStyle: {
                color: Styles.white
            },
            headerTintColor: Styles.white,
            headerTitle: "Details",
            headerTitleStyle: {
                fontSize: 25,
                fontWeight: "500"
            }
        };
    };

    render() {
        const summary = this.props.navigation.getParam("summary");
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.largeWeatherContainer}>
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
                                <Text
                                    style={[
                                        styles.textCenter,
                                        styles.textMuted
                                    ]}>
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
                </View>
                <View style={styles.extra}>
                    <ScrollView>
                        <Row
                            type={"Humidity"}
                            value={summary.humidity}
                            unit={"%"}
                        />
                        <Row
                            type={"Pressure"}
                            value={summary.pressure}
                            unit={"mb"}
                        />
                        <Row
                            type={"Wind Speed"}
                            value={summary.wind}
                            unit={this.props.units === "Metric" ? "m/s" : "mph"}
                        />
                    </ScrollView>
                </View>
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
        width: 150,
        height: 150,
        marginLeft: "15%"
    },
    largeText: {
        fontSize: 50,
        marginTop: 20
    },
    MinTemp: {
        marginTop: 10,
        fontSize: 25,
        color: "#6c757d"
    },
    date: {
        marginTop: 10,
        fontSize: 25,
        color: "#6c757d"
    },
    largeWeatherContainer: {
        paddingTop: 16,
        paddingBottom: 16
    },
    extra: {
        backgroundColor: Styles.detail_accent_pane_background,
        flex: 1
    },
    textMuted: {
        color: "#6c757d"
    }
});
