const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is active on Port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    console.log(req.body);
    var subs = require('./newslettersubscriptions.json');
    subs[Object.keys(subs).length] = req.body;
    subs = JSON.stringify(subs);
    fs.writeFileSync('./newslettersubscriptions.json', subs)
    res.sendFile(__dirname + "/success.html");
    });

