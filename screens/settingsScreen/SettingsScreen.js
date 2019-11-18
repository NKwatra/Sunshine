import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform,
    AsyncStorage
} from "react-native";
import UpdateSettingsDialog from "./UpdateSettingsDialog";
import { AntDesign } from "@expo/vector-icons";
import { currentLocationKey } from "../../preferenceKeys";
import * as Permissions from "expo-permissions";
import Styles from "../../Utilities/uiUtils/styles";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "Settings",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? null : Styles.colorPrimary
        },
        headerTintColor: Platform.OS === "ios" ? null : Styles.white,
        headerTitleStyle: {
            fontSize: 25,
            fontWeight: "500"
        }
    };

    state = {
        updateUnitsDialogVisible: false,
        updateLocationDialogVisible: false
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.updateUnitsSetting()}
                    style={
                        Platform.OS === "ios"
                            ? [styles.settingGroupIos, styles.row]
                            : styles.settingGroup
                    }>
                    <Text
                        style={
                            Platform.OS === "ios"
                                ? styles.largeFont
                                : [styles.preferenceLable, styles.largeFont]
                        }>
                        UNITS
                    </Text>
                    <Text
                        style={
                            Platform.OS === "ios"
                                ? [styles.preferenceLable, styles.largeFont]
                                : styles.largeFont
                        }>
                        {this.props.units}
                        {Platform.OS === "ios" ? (
                            <AntDesign name="right" tintColor="#78909c" />
                        ) : null}
                    </Text>
                </TouchableOpacity>
                <View
                    style={
                        Platform.OS === "ios"
                            ? [
                                  styles.row,
                                  styles.settingGroupIos,
                                  styles.diffPadding
                              ]
                            : [
                                  styles.row,
                                  styles.settingGroup,
                                  styles.diffPadding
                              ]
                    }>
                    <Text
                        style={
                            Platform.OS === "ios"
                                ? styles.largeFont
                                : [styles.preferenceLable, styles.largeFont]
                        }>
                        USE DEVICE LOCATION
                    </Text>
                    <Switch
                        value={this.props.currLocation === "true"}
                        onValueChange={value =>
                            this.handleLocationSwitchChange(value)
                        }
                    />
                </View>
                {this.props.currLocation === "true" ? null : (
                    <TouchableOpacity>
                        <TouchableOpacity
                            style={
                                Platform.OS === "ios"
                                    ? [styles.settingGroupIos, styles.row]
                                    : styles.settingGroup
                            }
                            onPress={() => this.updateLocationSetting()}>
                            <Text
                                style={
                                    Platform.OS === "ios"
                                        ? styles.largeFont
                                        : [
                                              styles.preferenceLable,
                                              styles.largeFont
                                          ]
                                }>
                                LOCATION
                            </Text>
                            <Text
                                style={
                                    Platform.OS === "ios"
                                        ? [
                                              styles.preferenceLable,
                                              styles.largeFont
                                          ]
                                        : styles.largeFont
                                }>
                                {this.props.location}
                                {Platform.OS === "ios" ? (
                                    <AntDesign
                                        name="right"
                                        tintColor="#78909c"
                                    />
                                ) : null}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                <UpdateSettingsDialog
                    visible={this.state.updateUnitsDialogVisible}
                    title="Please select units for temperature"
                    locationUpdate={false}
                    value={this.props.units}
                    cancel={() => this.hideDialog("updateUnitsDialogVisible")}
                    update={newUnits => this.props.updateUnits(newUnits)}
                    refetch={this.props.updateWeather}
                />
                <UpdateSettingsDialog
                    visible={this.state.updateLocationDialogVisible}
                    title="Please select location to load weather"
                    locationUpdate={true}
                    value={this.props.location}
                    cancel={() =>
                        this.hideDialog("updateLocationDialogVisible")
                    }
                    update={newLocation =>
                        this.props.updateLocation(newLocation)
                    }
                    refetch={this.props.updateWeather}
                />
            </View>
        );
    }

    updateUnitsSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: false,
                  value: this.props.units,
                  update: newUnits => this.props.updateUnits(newUnits),
                  refetch: this.props.updateWeather
              })
            : this.setState({ updateUnitsDialogVisible: true });
    }

    updateLocationSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: true,
                  value: this.props.location,
                  update: newLocation => this.props.updateLocation(newLocation),
                  refetch: this.props.updateWeather
              })
            : this.setState({ updateLocationDialogVisible: true });
    }

    hideDialog(dialogKey) {
        this.setState({
            [dialogKey]: false
        });
    }

    async handleLocationSwitchChange(value) {
        if (value) {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== "granted") {
                alert("Please allow location permission from settings");
                return;
            }
        }
        this.props.updateCurrLocation(value.toString());
        AsyncStorage.setItem(currentLocationKey, value.toString());
        this.props.updateWeather();
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    settingGroup: {
        padding: 10,
        marginBottom: 20
    },
    settingGroupIos: {
        padding: 20,
        marginBottom: 20
    },
    preferenceLable: {
        color: "#78909C"
    },
    diffPadding: {
        padding: 15
    },
    centredContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    largeFont: {
        fontSize: 18
    }
});

export default SettingsScreen;
