import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { NavProps } from "../types";

const PlacesListScreen: React.FC<NavProps> = ({ navigation }) => {
    // navigation.setOptions({
    //     headerTitle: "All Places",
    // });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "All Places",
            headerRight: () => (
                <Icon
                    name="ios-add"
                    size={30}
                    color="black"
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate("NewPlace")}
                />
            ),
        });
    }, [navigation]);
    return (
        <View>
            <Text>PlacesListScreen</Text>
            <Button
                title="Go to details"
                onPress={() => navigation.navigate("PlaceDetails")}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
