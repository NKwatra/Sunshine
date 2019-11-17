import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MainScreenContainer from "../screens/mainScreen/MainScreenContainer";
import DetailScreen from "../screens/detailScreen/DetailScreen";
import BottomNavigationIcon from "./BottomNavigationIcon";

export default HomeTab = createStackNavigator(
    {
        summary: MainScreenContainer,
        detail: DetailScreen
    },
    {
        initialRouteName: "summary",
        navigationOptions: {
            tabBarIcon: <BottomNavigationIcon name="home" />
        }
    }
);
