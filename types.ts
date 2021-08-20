import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    PlaceDetails: undefined;
    NewPlace: undefined;
    Map: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type ScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export type NavProps = {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
};
