import { Place } from "../models/Place";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (place: Place) => {
    return {
        type: ADD_PLACE,
        place,
    };
};
