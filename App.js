import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import HomeTab from "./tabs/HomeTab";
import SettingsTab from "./tabs/SettingsTab";
import { Provider } from "react-redux";
import store from "./redux/store";
import styles from "./Utilities/uiUtils/styles";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import loadWeatherinBackground from "./BackgroundTasks";

const UPDATE_WEATHER_TASK = "updateWeatherTask";

TaskManager.defineTask(UPDATE_WEATHER_TASK, () => {
    loadWeatherinBackground();
});

BackgroundFetch.registerTaskAsync(UPDATE_WEATHER_TASK, {
    minimumInterval: 21600,
    stopOnTerminate: false,
    startOnBoot: true
});

const BottomNavigationBar = createMaterialBottomTabNavigator(
    {
        Home: HomeTab,
        Settings: SettingsTab
    },
    {
        labeled: false,
        barStyle: { backgroundColor: styles.colorPrimary },
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
        return (
            <Provider store={store}>
                <AppConatiner />
            </Provider>
        );
    }
}
