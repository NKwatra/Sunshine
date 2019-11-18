import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Row = props => {
    return (
        <View style={styles.row}>
            <Text style={styles.halfWidth}>{props.type}</Text>
            <Text style={styles.halfWidth}>{`${props.value.toFixed(1)} ${
                props.unit
            }`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        padding: 15,
        marginTop: 25
    },
    halfWidth: {
        width: "50%",
        fontSize: 20,
        paddingLeft: 10
    }
});

export default Row;
