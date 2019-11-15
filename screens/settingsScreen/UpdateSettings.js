import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default UpdateSettings = props => {
    const [value, updatevalue] = useState(props.navigation.getParam("value"));
    return (
        <View style={styles.mainContainer}>
            {props.navigation.getParam("updateLocation") ? (
                <View style={styles.locationContainer}>
                    <KeyboardAvoidingView>
                        <Text style={styles.locationPrompt}>
                            Please enter the location (city, country)
                        </Text>
                        <TextInput
                            autoFocus
                            defaultValue={props.navigation.getParam("value")}
                            value={value}
                            onChangeText={newValue => updateLocation(newValue)}
                            onSubmitEditing={() => console.log(location)}
                            style={styles.locationInput}></TextInput>
                    </KeyboardAvoidingView>
                </View>
            ) : (
                <View>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => updatevalue("Metric")}>
                        <Text style={styles.unitsOption}>Metric </Text>
                        {value === "Metric" ? (
                            <Feather name="check" color="#ff0000" size={25} />
                        ) : null}
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => updatevalue("Imperial")}>
                        <Text style={styles.unitsOption}>Imperial </Text>
                        {value === "Imperial" ? (
                            <Feather name="check" color="#ff0000" size={25} />
                        ) : null}
                    </TouchableOpacity>
                    <View style={styles.line} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        paddingTop: 150,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        backgroundColor: "rgb(142, 142, 147)"
    },
    mainContainer: {
        flex: 1
    },
    locationPrompt: {
        fontSize: 28,
        marginBottom: 15
    },
    locationInput: {
        borderColor: "#fff",
        borderWidth: 1,
        fontSize: 16,
        padding: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    unitsOption: {
        fontSize: 20
    },
    line: {
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#78909C"
    }
});
