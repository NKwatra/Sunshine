import { Notifications } from "expo";
import { Platform } from "react-native";

const channelId = "updates";

export default showNotification = () => {
    if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync(channelId, {
            name: "Updates",
            description: "Weather updates notifications",
            sound: true,
            priority: "high",
            vibrate: true,
            badge: true
        });
    }

    Notifications.presentLocalNotificationAsync({
        title: "Weather Updates",
        body:
            "Sunshine recently updated weather forecast, do check it out before you go out",
        ios: {
            sound: true
        },
        android: {
            channelId: channelId
        }
    });
};
