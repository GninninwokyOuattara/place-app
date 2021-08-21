import { Place } from "../models/Place";
import * as FileSystem from "expo-file-system";
import { insertPlace, getPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";

export const addPlace = (title: string, selectedImage: string) => {
    return async (dispatch: any) => {
        try {
            const imageName = selectedImage.split("/").pop();
            let path: string;

            if (FileSystem.documentDirectory) {
                path = FileSystem.documentDirectory + imageName;

                const dbResult: any = await insertPlace(
                    title,
                    path,
                    "dummy_address",
                    1.42,
                    42.1
                );

                const newPlace = new Place(
                    dbResult.insertId.toString(),
                    title,
                    path,
                    "address",
                    123,
                    456
                );

                dispatch({
                    type: ADD_PLACE,
                    place: newPlace,
                });

                await FileSystem.moveAsync({
                    from: selectedImage,
                    to: path,
                });
            } else {
                throw new Error("Could not save image");
            }
        } catch (error) {
            throw error;
        }
    };
};

export const fetchPlaces = () => {
    return async (dispatch: any) => {
        try {
            const dbRes: any = await getPlaces();
            const data = dbRes.rows._array;
            let places: Place[] = [];

            if (data) {
                data.forEach((place: Place) => {
                    const newPlace = new Place(
                        place.id.toString(),
                        place.title,
                        place.imageUri,
                        place.address,
                        place.lat,
                        place.lng
                    );
                    places = [...places, newPlace];
                });
                dispatch({
                    type: FETCH_PLACES,
                    places,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
