import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { Place } from "../models/Place";
import { addPlace } from "../stores/place-actions";
import { MarkerPos, NavProps } from "../types";

import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";
import * as Location from "expo-location";

import { locationToAddress } from "../stores/place-actions";

const NewPlaceScreen: React.FC<NavProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectImage] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<MarkerPos>();

    const onSelectedImage = (imageUri: string) => {
        setSelectImage(imageUri);
    };

    const handleSave = useCallback(() => {
        dispatch(addPlace(title, selectedImage, selectedLocation!));
        navigation.goBack();
    }, [dispatch, title, selectedImage, selectedLocation]);

    return (
        <ScrollView style={styles.container} contentInset={{ bottom: 100 }}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                    style={styles.inputField}
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                />
            </View>
            <ImgPicker onSelectedImage={onSelectedImage} />
            <LocationPicker
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
            <Button
                title={"Pick Location on Map"}
                onPress={() =>
                    navigation.navigate("Map", {
                        setSelectedLocation,
                    })
                }
            />
            <Button
                title="Save Place"
                color={Colors.primary}
                onPress={handleSave}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        // marginBottom: 10,
    },
    inputContainer: {
        alignSelf: "center",
        width: "90%",
        marginBottom: 10,
    },
    inputTitle: {
        fontSize: 25,
        marginBottom: 5,
    },
    inputField: {
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
        fontSize: 15,
    },
    saveButton: {
        color: Colors.primary,
    },
});

export default NewPlaceScreen;
