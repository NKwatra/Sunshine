import React from "react";
import Dialog from "react-native-dialog";
import { Picker } from "react-native";

export default UpdateSettingsDialog = props => {
    return (
        <Dialog.Container visible={props.visible}>
            <Dialog.Title>{props.title}</Dialog.Title>
            {props.locationUpdate ? (
                <Dialog.Input
                    label="Location"
                    value={props.location}></Dialog.Input>
            ) : (
                <Picker selectedValue={props.units}>
                    <Picker.Item label="Metric" value="metric" />
                    <Picker.Item label="Imperial" value="imperial" />
                </Picker>
            )}
            <Dialog.Button label="Save" onPress={props.save}></Dialog.Button>
            <Dialog.Button
                label="Cancel"
                onPress={props.cancel}></Dialog.Button>
        </Dialog.Container>
    );
};
