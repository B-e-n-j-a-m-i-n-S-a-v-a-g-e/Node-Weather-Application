const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/540e8c9caa221089dafc7b6a13c8a7cf/' + encodeURIComponent(lat) + "," + encodeURIComponent(lon);
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback("Unable to find location. Try another search");
        } else {
        callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " % chance of rain.")
        }
    })
}

module.exports = forecast;