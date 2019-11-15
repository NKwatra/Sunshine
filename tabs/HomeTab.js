import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "../screens/mainScreen/MainScreen";
import DetailScreen from "../screens/detailScreen/DetailScreen";
import BottomNavigationIcon from "./BottomNavigationIcon";

export default HomeTab = createStackNavigator(
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
