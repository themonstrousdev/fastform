const express = require('express'),
    app = express.Router(),
    printer = require('./pdfmaker'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt');


//models
const models = require("./db-models");



app.post("/success", async (req, res) => {
    (req.body.organDonor == 'true') ? req.body.organDonor = true: req.body.organDonor = false;
    if(req.session.loggedIn) {
        await models.users.findById(req.session.userID, (err, found)=>{
            if(!err && found) {
                req.body.birthday = found.birthday
            }
        });
    }
    const application = new models.apps({
        user_id: req.session.userID,
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
                id: savedApp._id,
                loggedIn: req.session.loggedIn,
                userID: req.session.userID
            });
        } else {

        }
    } catch (err) {
        console.log(err);
    }
});

app.post("/add-user", async (req, res) => {
    var email = req.body.email,
        username = req.body.username,
        firstname = req.body.firstname,
        lastname = req.body.lastname,
        national_id = req.body.national_id,
        birthday = req.body.birthday,
        password = req.body.password,
        admin = (req.body.isAdmin == "admin");

    const user = new models.users({
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        national_id: national_id,
        birthday: birthday,
        password: password,
        isAdmin: admin
    });

    try {
        const savedUser = await user.save();
        if (savedUser) {
            res.redirect("/registered")
        }
    } catch (err) {
        if(err.code == 11000) {
            res.redirect("/in-use")
        }
    }
});

app.post("/auth", (req, res) => {
    authenticate(req.body.username, req.body.password, login);
    function login(err, found) {
        if(err) {
            res.json(err)
        } else if (!found) {
            res.redirect('/login?login=true');
        } else {
            req.session.userID = found._id;
            req.session.loggedIn = true;
            req.session.admin = found.isAdmin;
            res.redirect("/");
        }
    }
});

app.post("/add-task", async (req, res)=> {
    if(checkAuth(req.session)) {
        const task = new models.tasks({
            user_id: req.session.userID,
            content: req.body.needToDo
        });

        await task.save();
    }
        res.redirect("/");
});

app.post("/app-action/reject", async (req, res)=>{
    if(checkAuth(req.session)) {    
        await models.apps.findById(req.body.app_id, (err, app) => {
            if(!err && app) {
                app.reason = req.body.reason;
                app.status = 'rejected';
                app.save();
            }
        });

        res.redirect(req.headers.referer);
    } else {
        res.redirect("/");
    }
});

app.post("/app-action/accept", async (req, res)=>{
    if(checkAuth(req.session)) {
        await models.apps.findById(req.body.app_id, (err, app)=>{
            if(!err && app) {
                app.status = 'approved';
                app.save();
            }
        });

        res.redirect(req.headers.referer);
    } else {
        res.redirect("/");
    }
})

app.post("/app-action/pending", async (req, res)=>{
    if(checkAuth(req.session)) {
        await models.apps.findById(req.body.app_id, (err, app)=>{
            if(!err && app) {
                app.status = 'pending';
                app.save();
            }
        });

        res.redirect(req.headers.referer);
    } else {
        res.redirect("/");
    }
})

app.post("*", (req, res) => {
    res.render("404", {
        back: (req.headers.referer) ? req.headers.referer : "/",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID
    });
});

module.exports = app;

function authenticate(username, password, callback) {
    var result = {};
    var user;
    models.users.findOne({
        email: username
    }, (err, found) => {
        if (err) {
            var err = new Error("Something went wrong.");
            err.status = 500;
            return callback(err);
        } else if (!user) {
            models.users.findOne({
                username: username
            }, (err, userDos) => {
                if (err) {
                    var err = new Error("Something went wrong.");
            err.status = 500;
            return callback(err);
                } else if (!userDos) {
                    return callback(null, false);
                } else {
                    bcrypt.compare(password, userDos.password, (err, result) => {
                        if (result) {
                            return callback(null, userDos)
                        } else {
                           return callback(null, false);
                        }
                    })

                }
            })
        }
    });
    return result;
}

function checkAuth(session) {
    return (session.loggedIn && session.admin);
}