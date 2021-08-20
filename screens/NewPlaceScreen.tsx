import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavProps } from "../types";

const NewPlaceScreen: React.FC<NavProps> = ({ navigation }) => {
    return (
        <View>
            <Text>NewPlaceScreen</Text>
            <Button
                title="Go to map"
                onPress={() => navigation.navigate("Map")}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default NewPlaceScreen;
