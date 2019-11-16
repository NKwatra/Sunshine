import React from "react";
import { View, ProgressBarAndroid, StatusBar, StyleSheet } from "react-native";

const LoadingIndicator = props => {
    return (
        <View style={styles.centredContent}>
            {/* TODO : Find a better alternative to show loading on ios devices */}
            <StatusBar networkActivityIndicatorVisible={props.loading} />
            <ProgressBarAndroid color="red" animating={props.loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    centredContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    }
});

export default LoadingIndicator;
