import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { useSelector, useDispatch } from "react-redux";
import { RootState, NavProps } from "../types";

import PlaceList from "../components/PlaceList";
import { fetchPlaces } from "../stores/place-actions";

const PlacesListScreen: React.FC<NavProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { places } = useSelector((state: RootState) => state.place);

    useEffect(() => {
        dispatch(fetchPlaces());
    }, [dispatch]);

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
            <PlaceList places={places} navigation={navigation} />
            {/* <Text>PlacesListScreen</Text> */}
            {/* <Button
        //         title="Go to details"
        //         onPress={() => navigation.navigate("PlaceDetails")}
        //     /> */}
        </View>
    );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
