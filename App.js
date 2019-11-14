import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainScreen from "./screens/mainScreen/MainScreen";
import DetailScreen from "./screens/detailScreen/DetailScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SettingsScreen from "./screens/settingsScreen/SettingsScreen";
import BottomNavigationIcon from "./BottomNavigationIcon";

const AppNavigation = createStackNavigator(
    {
        summary: MainScreen,
        detail: DetailScreen
    },
    {
        initialRouteName: "summary",
        navigationOptions: {
            tabBarIcon: <BottomNavigationIcon name="home" />
        }
    }
);

const BottomNavigationBar = createMaterialBottomTabNavigator(
    {
        Home: AppNavigation,
        Settings: SettingsScreen
    },
    {
        labeled: false,
        barStyle: { backgroundColor: "#fff" },
        initialRouteName: "Home",
        backBehavior: "order",
        // TODO : try to work out active color
        activeColor: "#ff0000",
        inactiveColor: "#fff"
    }
);

const AppConatiner = createAppContainer(BottomNavigationBar);

export default class App extends React.Component {
    render() {
        return <AppConatiner />;
    }
}
