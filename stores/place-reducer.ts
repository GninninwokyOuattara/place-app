import { Place } from "../models/Place";
import {
    ReducerActionsParams,
    PlaceState,
    ReducerActionsParamsList,
} from "../types";
import { ADD_PLACE, FETCH_PLACES } from "./place-actions";

const placesState: PlaceState = {
    places: [],
};

export default (
    state = placesState,
    action: ReducerActionsParams | ReducerActionsParamsList
) => {
    switch (action.type) {
        case ADD_PLACE:
            if ("place" in action) {
                return { ...state, places: [...state.places, action.place] };
            }
        case FETCH_PLACES:
            if ("places" in action) {
                const places = [...action.places];
                return { ...state, places };
            }
        default:
            return state;
    }
};
