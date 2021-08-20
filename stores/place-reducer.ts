import { ReducerActionsParams, PlaceState } from "../types";
import { ADD_PLACE } from "./place-actions";

const placesState: PlaceState = {
    places: [],
};

export default (state = placesState, action: ReducerActionsParams) => {
    switch (action.type) {
        case ADD_PLACE:
            return { ...state, places: [...state.places, action.place] };
        default:
            return state;
    }
};
