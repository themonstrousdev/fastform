const express = require('express'),
    bodyParser = require("body-parser"),
    app = express(),
    printer = require('./pdfmaker'),
    fileUpload = require('express-fileupload'),
    mongoose = require('mongoose');


//models
const models = require("./db-models");

//middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));



app.post("/success", async (req, res) => {
    (req.body.organDonor == 'true') ? req.body.organDonor = true: req.body.organDonor = false;
    const application = new models.apps({
        appInfo: req.body
    });
    try {
        let savedApp;
        if (req.files || Object.keys(req.files).length > 0) {
            for (var file in req.files) {
                let theFile = req.files[file],
                    filename = theFile.name,
                    ext = filename.substring(filename.lastIndexOf('.'), filename.length),
                    path = __dirname.substring(0, __dirname.lastIndexOf('\\') + 1),
                    dest = `\\requirements\\${application._id}-${file}${ext}`;
                move = `${path}public${dest}`;
                application.appInfo[file] = dest;
                theFile.mv(move, err => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })
            }

            savedApp = await application.save();
            res.render('success', {
                title: "Success | About",
                id: savedApp._id
            });
        } else {
            
        }
    } catch (err) {
        console.log(err);
    }
});

app.post("*", (req, res) => {
    res.render("404", {
        back: (req.headers.referer) ? req.headers.referer : "/"
    });
});

module.exports = app;