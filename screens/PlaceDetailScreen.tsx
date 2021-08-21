import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavProps } from "../types";

const PlaceDetailScreen: React.FC<NavProps> = ({ navigation, route }) => {
    const placeParams = route.params as any;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: placeParams.placeTitle,
        });
    }, [placeParams]);
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
