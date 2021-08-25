import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Place } from "../models/Place";
import { ScreenNavigationProp } from "../types";

interface props {
    place: Place;
    navigation: ScreenNavigationProp;
}

const PlaceItem: React.FC<props> = ({ place, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("PlaceDetails", {
                    placeId: place.id,
                    placeTitle: place.title,
                })
            }
        >
            <View style={styles.itemContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            place.imageUri ||
                            "https://snack-web-player.s3.us-west-1.amazonaws.com/v2/42/static/media/react-native-logo.79778b9e.png",
                    }}
                />
                <View>
                    <Text style={styles.header}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "#CCC",
        borderTopColor: "#CCC",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 100,
        // alignItems: "center",
        // width: "100%",
        paddingHorizontal: 10,
    },
    image: {
        borderWidth: 1,
        height: 80,
        width: 80,
        borderRadius: 50,
        alignSelf: "center",
        marginRight: 10,
    },

    header: {
        fontWeight: "600",
        fontSize: 20,
        marginTop: 15,
    },
    address: {
        fontSize: 20,
        color: "#CCC",
    },
});

export default PlaceItem;
