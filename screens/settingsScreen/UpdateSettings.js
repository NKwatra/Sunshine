import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    AsyncStorage
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { locationKey, unitsKey } from "../../preferenceKeys";

export default class UpdateSettings extends React.Component {
    state = {
        value: this.props.navigation.getParam("value")
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.props.navigation.getParam("updateLocation") ? (
                    <View style={styles.locationContainer}>
                        <KeyboardAvoidingView>
                            <Text style={styles.locationPrompt}>
                                Please enter the location (city, country)
                            </Text>
                            <TextInput
                                autoFocus
                                defaultValue={this.props.navigation.getParam(
                                    "value"
                                )}
                                value={this.state.value}
                                onChangeText={newValue =>
                                    this.setState({
                                        value: newValue
                                    })
                                }
                                onSubmitEditing={() => {
                                    const update = this.props.navigation.getParam(
                                        "update"
                                    );
                                    update(this.state.value);
                                    AsyncStorage.setItem(
                                        locationKey,
                                        this.state.value
                                    );
                                }}
                                style={styles.locationInput}></TextInput>
                        </KeyboardAvoidingView>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => {
                                this.setState(
                                    {
                                        value: "Metric"
                                    },
                                    () => {
                                        const update = this.props.navigation.getParam(
                                            "update"
                                        );
                                        update(this.state.value);
                                        AsyncStorage.setItem(
                                            unitsKey,
                                            this.state.value
                                        );
                                    }
                                );
                            }}>
                            <Text style={styles.unitsOption}>Metric </Text>
                            {this.state.value === "Metric" ? (
                                <Feather
                                    name="check"
                                    color="#ff0000"
                                    size={25}
                                />
                            ) : null}
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => {
                                this.setState(
                                    {
                                        value: "Imperial"
                                    },
                                    () => {
                                        const update = this.props.navigation.getParam(
                                            "update"
                                        );
                                        update(this.state.value);
                                        AsyncStorage.setItem(
                                            unitsKey,
                                            this.state.value
                                        );
                                    }
                                );
                            }}>
                            <Text style={styles.unitsOption}>Imperial </Text>
                            {this.state.value === "Imperial" ? (
                                <Feather
                                    name="check"
                                    color="#ff0000"
                                    size={25}
                                />
                            ) : null}
                        </TouchableOpacity>
                        <View style={styles.line} />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    locationContainer: {
        paddingTop: 150,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        backgroundColor: "rgb(142, 142, 147)"
    },
    mainContainer: {
        flex: 1
    },
    locationPrompt: {
        fontSize: 28,
        marginBottom: 15
    },
    locationInput: {
        borderColor: "#fff",
        borderWidth: 1,
        fontSize: 16,
        padding: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    unitsOption: {
        fontSize: 20
    },
    line: {
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#78909C"
    }
});
