import React from "react";
import { Text, View, StyleSheet, Share, Button } from "react-native";

// TODO : (optinal) style the text to be shared
export default DetailScreen = props => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Text>
                {navigation.getParam("summary", "No Information available")}
            </Text>
            <Button
                title="Share"
                onPress={() =>
                    shareWeather(
                        navigation.getParam(
                            "summary",
                            "No Information available"
                        )
                    )
                }></Button>
        </View>
    );
};

const shareWeather = message => {
    Share.share(
        {
            message: `Hey checkout these weather details :
    ${message}`
        },
        {
            dialogTitle: "How would you like to share weather?",
            subject: "Weather Details"
        }
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
