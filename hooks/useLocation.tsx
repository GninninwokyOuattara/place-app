import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

const useLocation = () => {
    const [location, setLocation] = useState<null | Location.LocationObject>(
        null
    );
    const [error, setError] = useState<null | string>(null);

    const loadLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setError("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    useEffect(() => {
        loadLocation();
    }, []);

    return { location, error };
};

export default useLocation;
