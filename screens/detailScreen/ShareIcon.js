import React from "react";
import { TouchableOpacity, Image, Share, StyleSheet } from "react-native";

export default ShareIcon = props => {
    return (
        <TouchableOpacity onPress={() => shareWeather(props.message)}>
            <Image
                source={require("../../assets/images/share_icon.png")}
                style={styles.icon}
            />
        </TouchableOpacity>
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
    icon: {
        marginRight: 8
    }
});
