import React from "react";
import { View, Text } from "react-native";
import BottomNavigationIcon from "../../BottomNavigationIcon";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: <BottomNavigationIcon name="settings" />
    };

    render() {
        return (
            <View>
                <Text> Hey</Text>
            </View>
        );
    }
}
