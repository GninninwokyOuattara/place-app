import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import Colors from "../constants/Colors";
import { getPlace } from "../helpers/db";
import { Place } from "../models/Place";
import { NavProps } from "../types";

const PlaceDetailScreen: React.FC<NavProps> = ({ navigation, route }) => {
    const placeParams = route.params as any;
    const [placeData, setPlaceData] = useState<Place | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: placeParams.placeTitle,
        });

        getPlace(placeParams.placeId)
            .then((res) => setPlaceData(res))
            .catch((err) => console.log(err));
    }, [placeParams]);

    if (!placeData) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: placeData.imageUri }} style={styles.image} />
            <TouchableOpacity
                style={styles.previewContainer}
                onPress={() =>
                    navigation.navigate("Map", {
                        lat: placeData.lat,
                        lng: placeData.lng,
                        latDelta: 0.005,
                        lngDelta: 0.005,
                    })
                }
            >
                <View style={styles.previewContainer2}>
                    <View style={styles.mapPreview}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressHeader}>
                                {placeData.address}
                            </Text>
                        </View>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: placeData.lat,
                                longitude: placeData.lng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                            // minZoomLevel={100}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 200,
    },
    previewContainer: {
        backgroundColor: "white",
        width: "90%",
        height: 400,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    previewContainer2: {
        flex: 1,

        borderRadius: 15,
        overflow: "hidden",
    },
    addressContainer: {
        flex: 0,
        height: "15%",
        // width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    addressHeader: {
        color: Colors.primary,
        textAlign: "center",
    },
    mapPreview: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    map: {
        width: "100%",
        height: "85%",
    },
});

export default PlaceDetailScreen;
