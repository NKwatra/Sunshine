import { Notifications } from "expo";
import { Platform } from "react-native";

const channelId = "updates";

export default showNotification = weather => {
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

    let Message = `${weather.date}, ${weather.description} - ${weather.max_temp} / ${weather.min_temp}`;

    Notifications.presentLocalNotificationAsync({
        title: "Weather Updates",
        body: Message,
        ios: {
            sound: true
        },
        android: {
            channelId: channelId
        }
    });
};
