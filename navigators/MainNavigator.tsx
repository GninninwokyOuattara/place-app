import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import Colors from "../constants/Colors";

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    return (
        <RootStack.Navigator
            initialRouteName={"Home"}
            screenOptions={{ headerTintColor: Colors.primary }}
        >
            <RootStack.Screen name="Home" component={PlacesListScreen} />
            <RootStack.Screen
                name="PlaceDetails"
                component={PlaceDetailScreen}
            />
            <RootStack.Screen name="NewPlace" component={NewPlaceScreen} />
            <RootStack.Screen name="Map" component={MapScreen} />
        </RootStack.Navigator>
    );
};

export default MainNavigator;
