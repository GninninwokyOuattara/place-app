import React, { useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface props {
    onSelectedImage: (imageUri: string) => void;
}

const ImgPicker: React.FC<props> = (props) => {
    const [image, setImage] = useState<null | string>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            setImage(result.uri);
            props.onSelectedImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);
    return (
        <View style={styles.container}>
            <Text>No image picked yet</Text>
            <Image source={{ uri: image || "#" }} style={styles.imgContainer} />
            <Button title={"Take Image"} onPress={pickImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
    },
    imgContainer: {
        height: 200,
        width: 200,
        borderWidth: 1,
    },
});

export default ImgPicker;
