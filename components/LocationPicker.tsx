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
import MapView from "react-native-maps";

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

    let renderedContent: JSX.Element;
    if (!location) {
        renderedContent = <Text>{"No location picked yet"}</Text>;
    } else {
        renderedContent = (
            <MapView
                style={styles.map}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0221,
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                {isLoading && <ActivityIndicator size="large" />}
                {isLoading || renderedContent}
            </View>

            <Button title="Detect Location" onPress={pickLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
    },
    locationContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: 200,
        borderWidth: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default LocationPicker;
