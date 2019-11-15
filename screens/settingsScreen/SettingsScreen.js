import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform,
    StatusBar,
    ProgressBarAndroid,
    AsyncStorage
} from "react-native";
import UpdateSettingsDialog from "./UpdateSettingsDialog";
import { AntDesign } from "@expo/vector-icons";
import {
    unitsKey,
    currentLocationKey,
    locationKey
} from "../../preferenceKeys";
import * as Permissions from "expo-permissions";

export default class SettingsScreen extends React.Component {
    state = {
        [unitsKey]: "Metric",
        [currentLocationKey]: false,
        [locationKey]: "Not Set",
        updateUnitsDialogVisible: false,
        updateLocationDialogVisible: false,
        loading: true
    };

    componentDidMount() {
        this.setUpStateFromUserPreferences();
    }

    async setUpStateFromUserPreferences() {
        const [units, currentLocation, location] = await AsyncStorage.multiGet([
            unitsKey,
            currentLocationKey,
            locationKey
        ]);
        this.setState({
            units: units[1],
            currentLocation: Boolean(currentLocation[1]),
            location: location[1],
            loading: false
        });
    }

    render() {
        return this.state.loading ? (
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
        ) : (
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
                                ? null
                                : styles.preferenceLable
                        }>
                        UNITS
                    </Text>
                    <Text
                        style={
                            Platform.OS === "ios"
                                ? styles.preferenceLable
                                : null
                        }>
                        {this.state.units}
                        {Platform.OS === "ios" ? (
                            <AntDesign name="right" tintColor="#78909c" />
                        ) : null}
                    </Text>
                </TouchableOpacity>
                <View style={styles.line}></View>
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
                                ? null
                                : styles.preferenceLable
                        }>
                        USE DEVICE LOCATION
                    </Text>
                    <Switch
                        value={this.state.currentLocation}
                        onValueChange={value =>
                            this.handleLocationSwitchChange(value)
                        }
                    />
                </View>
                <View style={styles.line}></View>
                {this.state.currentLocation ? null : (
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
                                        ? null
                                        : styles.preferenceLable
                                }>
                                LOCATION
                            </Text>
                            <Text
                                style={
                                    Platform.OS === "ios"
                                        ? styles.preferenceLable
                                        : null
                                }>
                                {this.state.location}
                                {Platform.OS === "ios" ? (
                                    <AntDesign
                                        name="right"
                                        tintColor="#78909c"
                                    />
                                ) : null}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                    </TouchableOpacity>
                )}
                <UpdateSettingsDialog
                    visible={this.state.updateUnitsDialogVisible}
                    title="Please select units for temperature"
                    locationUpdate={false}
                    value={this.state.units}
                    cancel={() => this.hideDialog("updateUnitsDialogVisible")}
                    update={newState => this.setState(newState)}
                />
                <UpdateSettingsDialog
                    visible={this.state.updateLocationDialogVisible}
                    title="Please select location to load weather"
                    locationUpdate={true}
                    value={this.state.location}
                    cancel={() =>
                        this.hideDialog("updateLocationDialogVisible")
                    }
                    update={newState => this.setState(newState)}
                />
            </View>
        );
    }

    updateUnitsSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: false,
                  value: this.state.units
              })
            : this.setState({ updateUnitsDialogVisible: true });
    }

    updateLocationSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: true,
                  value: this.state.location
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
            if (status !== "granted") return;
        }
        this.setState({ currentLocation: value });
        AsyncStorage.setItem(currentLocationKey, value.toString());
    }
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: "#78909C",
        marginLeft: 10,
        marginRight: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    settingGroup: {
        padding: 10
    },
    settingGroupIos: {
        padding: 20
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
    }
});
