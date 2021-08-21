import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigators/MainNavigator";

import placeReducer from "./stores/place-reducer";
import { init } from "./helpers/db";

enableScreens();

init()
    .then((success) => {
        console.log(success);
    })
    .catch((error) => console.log(error));

export const rootReducer = combineReducers({
    place: placeReducer,
});
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
