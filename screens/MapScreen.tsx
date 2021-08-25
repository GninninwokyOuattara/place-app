import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import { MarkerPos } from "../types";
import { ScreenNavigationProp, NavProps, NavProps2 } from "../types";

const MapScreen: React.FC<NavProps2> = ({ navigation, route }) => {
    const { location, error } = useLocation();
    const [markerPos, setMarkerPos] = useState<null | MarkerPos>(null);
    // const setSelectedLocation = navigation.
    useLayoutEffect(() => {
        if (route.params) {
            const routeParams = route.params as any;
            const { setSelectedLocation } = routeParams;
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <Button
                            title="Save"
                            onPress={() => {
                                setSelectedLocation(markerPos);
                                navigation.goBack();
                            }}
                        />
                    );
                },
            });
        }
    }, [location, markerPos]);

    if (location) {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={(event) => {
                        setMarkerPos(event.nativeEvent.coordinate);
                    }}
                >
                    {markerPos ? (
                        <Marker key={1} coordinate={{ ...markerPos }} />
                    ) : null}
                </MapView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default MapScreen;
