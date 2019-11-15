import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import SettingsScreen from "../screens/settingsScreen/SettingsScreen";
import UpdateSettings from "../screens/settingsScreen/UpdateSettings";
import BottomNavigationIcon from "./BottomNavigationIcon";

export default SettingsTab = createStackNavigator(
    {
        settings: SettingsScreen,
        updateSettings: UpdateSettings
    },
    {
        initialRouteName: "settings",
        navigationOptions: {
            tabBarIcon: <BottomNavigationIcon name="settings" />
        }
    }
);
