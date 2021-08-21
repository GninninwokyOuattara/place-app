import uuid from "react-native-uuid";

export class Place {
    id: string;
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
    constructor(
        id: string,
        title: string,
        imageUri: string,
        address: string,
        lat: number,
        lng: number
    ) {
        this.id = id || (uuid.v4() as string);
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}
