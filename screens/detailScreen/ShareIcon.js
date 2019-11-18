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
    const weather = `${message.date}
    Weather: ${message.description}
    Maximun Temp : ${message.max_temp}
    Minimum Temp: ${message.min_temp}`;
    Share.share(
        {
            message: `Hey checkout these weather details :
    ${weather}`
        },
        {
            dialogTitle: "How would you like to share weather?",
            subject: "Weather Details"
        }
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 16
    }
});
