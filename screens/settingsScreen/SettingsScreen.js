import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";

export default class SettingsScreen extends React.Component {
    state = {
        units: "Metric",
        currentLocation: true,
        location: ""
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row}>
                    <Text>Units</Text>
                    <Text>{this.state.units}</Text>
                </TouchableOpacity>
                <View style={styles.line}></View>
                <View style={styles.row}>
                    <Text>Use Current Location</Text>
                    <Switch
                        value={this.state.currentLocation}
                        onValueChange={value =>
                            this.setState({ currentLocation: value })
                        }
                    />
                </View>
                <View style={styles.line}></View>
                {this.state.currentLocation ? null : (
                    <TouchableOpacity style={styles.row}>
                        <Text>Location</Text>
                        <Text>{this.state.location}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    line: {
        height: 2,
        backgroundColor: "gray"
    },
    row: {
        flexDirection: "row"
    }
});
