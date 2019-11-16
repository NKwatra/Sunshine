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
import ScreenContainer from "../../Utilities/ScreenContainer";

class SettingsScreen extends React.Component {
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
                        {this.props.units}
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
                        value={Boolean(this.props.currLocation)}
                        onValueChange={value =>
                            this.handleLocationSwitchChange(value)
                        }
                    />
                </View>
                <View style={styles.line}></View>
                {Boolean(this.props.currLocation) ? null : (
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
                                {this.props.location}
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
                    value={this.props.units}
                    cancel={() => this.hideDialog("updateUnitsDialogVisible")}
                    update={newUnits => this.props.updateUnits(newUnits)}
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
                />
            </View>
        );
    }

    updateUnitsSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: false,
                  value: this.props.units
              })
            : this.setState({ updateUnitsDialogVisible: true });
    }

    updateLocationSetting() {
        Platform.OS === "ios"
            ? this.props.navigation.navigate("updateSettings", {
                  updateLocation: true,
                  value: this.props.location
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
        this.props.updateCurrLocation(value);
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

export default ScreenContainer(SettingsScreen);
