const express = require('express'),
    bodyParser = require("body-parser"), 
    app = express();
    upload = require('./storage'),
    User = require('./user'),
    printer = require('./pdfmaker');

    //models
const models = require("./db-models");
const reqs = [
    {
        name: "studentsPermit",
        maxCount: 1
    },
    {
        name: "medCert",
        maxCount: 1
    }
]

//middleware
app.use(bodyParser.urlencoded({ extended: true }));




app.post("/success", upload.fields(reqs), async (req, res)=>{
    (req.body.organDonor == 'true') ? req.body.organDonor = true : req.body.organDonor = false;
    const application = new models.apps({
        appInfo: req.body
    });

    try {
        const savedApp = await application.save();
        // res.render('success', {title: "Success | About", id: savedApp._id});
        res.json()
    } catch (err) {
        console.log(err);
    }
});

app.post("*", (req, res)=>{
    res.render("404", {back: (req.headers.referer) ? req.headers.referer : "/"});
});

module.exports = app;