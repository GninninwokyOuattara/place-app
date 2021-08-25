import axios from "axios";
import { Place } from "../models/Place";
import * as FileSystem from "expo-file-system";
import { insertPlace, getPlaces } from "../helpers/db";
import { MAPBOX_TOKEN } from "@env";

import { MarkerPos } from "../types";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACES = "FETCH_PLACES";

export const locationToAddress = async (lat: number, lng: number) => {
    console.log(lat, lng);
    let res: any;
    try {
        res = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
        );
        return res.data.features[0].place_name;
    } catch (error) {
        throw error;
    }
};

export const addPlace = (
    title: string,
    selectedImage: string,
    selectedLocation: MarkerPos
) => {
    return async (dispatch: any) => {
        try {
            const imageName = selectedImage.split("/").pop();
            let path: string;

            if (FileSystem.documentDirectory) {
                path = FileSystem.documentDirectory + imageName;
                const address = await locationToAddress(
                    selectedLocation.latitude,
                    selectedLocation.longitude
                );

                const dbResult: any = await insertPlace(
                    title,
                    path,
                    address,
                    selectedLocation.latitude,
                    selectedLocation.longitude
                );

                const newPlace = new Place(
                    dbResult.insertId.toString(),
                    title,
                    path,
                    address,
                    selectedLocation.latitude,
                    selectedLocation.longitude
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
