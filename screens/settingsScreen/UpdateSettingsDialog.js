import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { Picker } from "react-native";
import { AsyncStorage } from "react-native";
import { unitsKey, locationKey } from "../../preferenceKeys";

export default UpdateSettingsDialog = props => {
    const [value, updateValue] = useState(props.value);
    return (
        <Dialog.Container visible={props.visible}>
            <Dialog.Title>{props.title}</Dialog.Title>
            {props.locationUpdate ? (
                <Dialog.Input
                    label="Location"
                    value={value}
                    onChangeText={newText =>
                        updateValue(newText)
                    }></Dialog.Input>
            ) : (
                <Picker
                    selectedValue={value}
                    onValueChange={newValue => updateValue(newValue)}>
                    <Picker.Item label="Metric" value="Metric" />
                    <Picker.Item label="Imperial" value="Imperial" />
                </Picker>
            )}
            <Dialog.Button
                label="Save"
                onPress={() => {
                    const key = props.locationUpdate ? locationKey : unitsKey;
                    props.update({ [key]: value });
                    props.cancel();
                    AsyncStorage.setItem(key, value);
                }}></Dialog.Button>
            <Dialog.Button
                label="Cancel"
                onPress={props.cancel}></Dialog.Button>
        </Dialog.Container>
    );
};
