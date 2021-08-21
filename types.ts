import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Place } from "./models/Place";
import { store } from "./App";

// Navigator Types

export type RootStackParamList = {
    Home: undefined;
    PlaceDetails: { placeTitle: string; placeId: string } | undefined;
    NewPlace: undefined;
    Map: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Home"
>;

export type ScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export type NavProps = {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
};

// Reducer Type

export type RootState = ReturnType<typeof store.getState>;

export interface PlaceState {
    places: Place[];
}
export interface ReducerActionsParams {
    type: string;
    place: Place;
}
export interface ReducerActionsParamsList {
    type: string;
    places: Place[];
}
