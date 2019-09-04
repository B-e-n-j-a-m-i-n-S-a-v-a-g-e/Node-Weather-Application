const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, "../Public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = express.static(path.join(__dirname, "../Public"));
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(publicDirectoryPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ben Savage"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Ben Savage"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is my help message",
        title: 'Help',
        name: 'Ben Savage'
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    } 

    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
     res.render('404', {
        title: '404',
        name: 'Ben Savage',
        errorMessage: "HELP ARTICLE NOT FOUND"
     })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben Savage',
        errorMessage: "PAGE NOT FOUND"
     })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});