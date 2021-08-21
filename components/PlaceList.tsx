import React from "react";
import { View, Text, FlatList } from "react-native";
import { Place } from "../models/Place";
import PlaceItem from "./PlaceItem";

import { ScreenNavigationProp } from "../types";

interface props {
    places: Place[];
    navigation: ScreenNavigationProp;
}

type renderItemFunction = (data: { item: Place }) => JSX.Element;

const PlaceList: React.FC<props> = ({ places, navigation }) => {
    const renderFunc: renderItemFunction = ({ item }) => {
        return <PlaceItem place={item} navigation={navigation} />;
    };
    return <FlatList data={places} renderItem={renderFunc} />;
};

export default PlaceList;
