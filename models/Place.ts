import uuid from "react-native-uuid";

export class Place {
    id: string;
    title: string;
    constructor(title: string) {
        this.id = uuid.v4() as string;
        this.title = title;
    }
}
