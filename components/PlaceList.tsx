import React from "react";
import { View, Text, FlatList } from "react-native";
import { Place } from "../models/Place";
import PlaceItem from "./PlaceItem";

interface props {
    places: Place[];
}

type renderItemFunction = (data: { item: Place }) => JSX.Element;

const PlaceList: React.FC<props> = ({ places }) => {
    const renderFunc: renderItemFunction = ({ item }) => {
        return <PlaceItem place={item} />;
    };
    return <FlatList data={places} renderItem={renderFunc} />;
};

export default PlaceList;
