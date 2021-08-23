import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Image,
} from "react-native";
import * as Location from "expo-location";

const LocationPicker = () => {
    const [isLoading, setIsloading] = useState(false);
    const [location, setLocation] = useState<null | Location.LocationObject>(
        null
    );
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    const pickLocation = async () => {
        setIsloading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setIsloading(false);
        setLocation(location);
    };
    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== "granted") {
    //             setErrorMsg("Permission to access location was denied");
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     })();
    // }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.locationContainer}
                source={{
                    uri: `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyApnFi0nkM-j2WXalLJ4hbX6yrHbu_p3sU&center=${location?.coords.latitude},${location?.coords.longitude}&size=200x200&maptype=roadmap&language=fr`,
                }}
            >
                {/* {isLoading && <ActivityIndicator size="large" />}
                {isLoading || (
                    <Text>
                        {location
                            ? location.coords.accuracy
                            : "No location picked yet"}
                    </Text>
                )} */}
            </Image>

            <Button title="Pick Location" onPress={pickLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
    },
    locationContainer: {
        height: 200,
        width: 200,
        borderWidth: 1,
    },
});

export default LocationPicker;
