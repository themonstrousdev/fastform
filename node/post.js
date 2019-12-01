const express = require('express'),
    bodyParser = require("body-parser"), 
    app = express(),
    upload = require('./storage');

    //models
const models = require("./db-models");

//middleware
app.use(bodyParser.urlencoded({ extended: true }));



app.post("/requirements", (req, res) => {
    (req.body.organDonor == 'true') ? req.body.organDonor = true : req.body.organDonor = false;
    var appInfo = req.body;
});

app.post("/upload", upload.array('SP', 'medCert'), (req, res) => {
    
})

app.post("/success", async (req, res)=>{
    (req.body.organDonor == 'true') ? req.body.organDonor = true : req.body.organDonor = false;
    const application = new models.apps({
        appInfo: req.body
    });

    try {
        const savedApp = await application.save();
        res.render('success', {title: "Success | About", id: savedApp._id});
    } catch (err) {
        console.log(err);
    }
});

app.post("*", (req, res)=>{
    res.render("404", {back: (req.headers.referer) ? req.headers.referer : "/"});
});

module.exports = app;