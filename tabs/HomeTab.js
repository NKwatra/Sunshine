import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MainScreenContainer from "../screens/mainScreen/MainScreenContainer";
import DetailScreenContainer from "../screens/detailScreen/DetailScreenContainer";
import BottomNavigationIcon from "./BottomNavigationIcon";

export default HomeTab = createStackNavigator(
    {
        summary: MainScreenContainer,
        detail: DetailScreenContainer
    },
    {
        initialRouteName: "summary",
        navigationOptions: {
            tabBarIcon: <BottomNavigationIcon name="home" />
        }
    }
);
