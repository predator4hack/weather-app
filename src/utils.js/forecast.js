const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=092b08e11383c8617c7a1220207b64dd&query=" +
        latitude +
        "," +
        longitude +
        "&units=f";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(
                "Unable to connect to location services (Low level error)!",
                undefined
            );
        } else if (body.error) {
            callback("Co-ordinate Error. Try another search", undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                description:
                    body.current.weather_descriptions[0] +
                    ", The temperature is " +
                    body.current.temperature +
                    " but it feels like " +
                    body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;
