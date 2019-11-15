import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform
} from "react-native";
import UpdateSettingsDialog from "./UpdateSettingsDialog";
import { AntDesign } from "@expo/vector-icons";

export default class SettingsScreen extends React.Component {
    state = {
        units: "Metric",
        currentLocation: false,
        location: "Not Set",
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
                            this.setState({ currentLocation: value })
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
                    units={this.state.units}
                    save={() => console.log("save")}
                    cancel={() => this.hideDialog("updateUnitsDialogVisible")}
                />
                <UpdateSettingsDialog
                    visible={this.state.updateLocationDialogVisible}
                    title="Please select location to load weather"
                    locationUpdate={true}
                    location={this.state.location}
                    save={() => console.log("save")}
                    cancel={() =>
                        this.hideDialog("updateLocationDialogVisible")
                    }
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
    }
});
