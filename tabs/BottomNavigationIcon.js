import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default BottonNavigationIcon = props => {
    return (
        <View style={styles.container}>
            <MaterialIcons
                name={props.name}
                size={32}
                color={props.tintColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 42,
        height: 42
    }
});
