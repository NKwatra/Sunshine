import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainScreen from "./screens/mainScreen/MainScreen";
import DetailScreen from "./screens/detailScreen/DetailScreen";

const AppNavigation = createStackNavigator(
    {
        summary: MainScreen,
        detail: DetailScreen
    },
    {
        initialRouteName: "summary"
    }
);

const AppConatiner = createAppContainer(AppNavigation);

export default class App extends React.Component {
    render() {
        return <AppConatiner />;
    }
}
