import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import SettingsScreenContainer from "../screens/settingsScreen/SetitngsScreenContainer";
import UpdateSettings from "../screens/settingsScreen/UpdateSettings";
import BottomNavigationIcon from "./BottomNavigationIcon";
import styles from "../Utilities/uiUtils/styles";

export default SettingsTab = createStackNavigator(
    {
        settings: SettingsScreenContainer,
        updateSettings: UpdateSettings
    },
    {
        initialRouteName: "settings",
        navigationOptions: {
            tabBarIcon: (
                <BottomNavigationIcon
                    name="settings"
                    tintColor={styles.white}
                />
            )
        }
    }
);
