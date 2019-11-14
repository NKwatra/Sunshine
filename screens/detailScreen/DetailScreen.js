import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ShareIcon from "./ShareIcon";

// TODO : (optinal) style the text to be shared
export default class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#f4511e"
            },
            headerRight: () => (
                <ShareIcon
                    message={navigation.getParam(
                        "summary",
                        "No Information available"
                    )}
                />
            )
        };
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>
                    {navigation.getParam("summary", "No Information available")}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
