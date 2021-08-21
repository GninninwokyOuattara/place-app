import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { Place } from "../models/Place";
import { addPlace } from "../stores/place-actions";
import { NavProps } from "../types";

import ImgPicker from "../components/ImgPicker";

const NewPlaceScreen: React.FC<NavProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectImage] = useState("");

    const onSelectedImage = (imageUri: string) => {
        setSelectImage(imageUri);
    };

    const handleSave = useCallback(() => {
        dispatch(addPlace(title, selectedImage));
        navigation.goBack();
    }, [dispatch, title, selectedImage]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                    style={styles.inputField}
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                />
            </View>
            <ImgPicker onSelectedImage={onSelectedImage} />
            <Button
                title="Save Place"
                color={Colors.primary}
                onPress={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
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
