import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places");

type funcParams = (
    title: string,
    imageUri: string,
    address: string,
    lat: number,
    lng: number
) => Promise<unknown>;

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
                [],
                () => {
                    resolve("initialized");
                },
                (_, error): boolean => {
                    reject(error);
                    return false;
                }
            );
        });
    });

    return promise;
};

export const insertPlace: funcParams = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
                [title, imageUri, address, lat, lng],
                (_, res) => {
                    resolve(res);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
    return promise;
};

export const getPlaces = () => {
    return new Promise(
        (resolve: (value: SQLite.SQLResultSet) => void, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM places",
                    [],
                    (_, res) => resolve(res),
                    (_, err) => {
                        reject(err);
                        return false;
                    }
                );
            });
        }
    );
};

export const getPlace = (itemId: string) => {
    return new Promise((resolve: (value: any) => void, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM places WHERE id = ?",
                [itemId],
                (_, res: any) => {
                    return resolve(res.rows._array[0]);
                },
                (_, err) => {
                    reject(err);
                    return false;
                }
            );
        });
    });
};
