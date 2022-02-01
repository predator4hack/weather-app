const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils.js/geocode");
const forecast = require("./utils.js/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars for and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Chandan Kumar",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About section",
        name: "Chandan Kumar",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is the helpful text",
        name: "Chandan Kumar",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address to search",
        });
    }
    geocode(
        req.query.address.toString(),
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecast) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecast.description,
                    location: location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("not_found", {
        title: "PAGE NOT FOUND",
        name: "Chandan Kumar",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 error",
        name: "Chandan Kumar",
    });
});

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});
