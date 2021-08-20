import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { RootState, NavProps } from "../types";

import PlaceList from "../components/PlaceList";

const PlacesListScreen: React.FC<NavProps> = ({ navigation }) => {
    const { places } = useSelector((state: RootState) => state.place);

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
            <PlaceList places={places} />
            <Button
                title="Go to details"
                onPress={() => navigation.navigate("PlaceDetails")}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
