import * as SQlite from "expo-sqlite";

export const insert = (data, units) => {
    const db = SQlite.openDatabase("sunshine.db");
    db.transaction(
        tx => {
            tx.executeSql(`create table if not exists weather(
            id INTEGER PRIMARY KEY NOT NULL,
            min_temp REAL NOT NULL,
            max_temp REAL NOT NULL,
            pressure REAL NOT NULL,
            humidity REAL NOT NULL,
            date TEXT NOT NULL,
            wind_speed REAL NOT NULL,
            description TEXT NOT NULL,
            units TEXT NOT NULL);`);
        },
        error => console.log("error in table creation", error),
        () => {
            db.transaction(
                tx1 => {
                    tx1.executeSql(
                        "DELETE FROM weather;",
                        (_, result) => console.log(result),
                        (_, err) => console.log(err)
                    );
                },
                err => console.log(err),
                () => {
                    let queryString =
                        "INSERT INTO weather (min_temp,max_temp,pressure,humidity,date,wind_speed,description,units) VALUES ";
                    let values = [];
                    data.forEach(dailyWeather => {
                        queryString += "(?,?,?,?,?,?,?,?), ";
                        values.push(
                            dailyWeather.min_temp,
                            dailyWeather.max_temp,
                            dailyWeather.pres,
                            dailyWeather.rh,
                            dailyWeather.valid_date,
                            dailyWeather.wind_spd,
                            dailyWeather.description,
                            units
                        );
                    });
                    queryString = queryString.slice(0, queryString.length - 2);
                    queryString += ";";
                    db.transaction(tx2 => {
                        tx2.executeSql(queryString, values);
                    });
                }
            );
        }
    );
};
