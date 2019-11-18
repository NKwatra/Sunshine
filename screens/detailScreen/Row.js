import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Styles from "../../Utilities/uiUtils/styles";

const Row = props => {
    return (
        <View style={styles.row}>
            <Text style={[styles.halfWidth, styles.gray]}>{props.type}</Text>
            <Text
                style={[
                    styles.halfWidth,
                    styles.white
                ]}>{`${props.value.toFixed(1)} ${props.unit}`}</Text>
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
        fontSize: 25,
        paddingHorizontal: 16
    },
    gray: {
        color: Styles.detail_accent_label
    },
    white: {
        color: Styles.white
    }
});

export default Row;
