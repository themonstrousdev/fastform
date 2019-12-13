const express = require('express'),
    app = express.Router(),
    models = require('./db-models');

app.get("/", async (req, res) => {
    if (req.session.loggedIn && req.session.admin) {
        models.users.findById(req.session.userID, (err, user) => {
            if (err) {
                console.log("hatdog");
            } else {
                models.tasks.find({user_id: req.session.userID}, (err, tasks) => {
                    res.render("admin-home", {
                        title: "FastForm | Control Room",
                        loggedIn: req.session.loggedIn,
                        userID: req.session.userID,
                        name: user.firstname,
                        tasks: tasks
                    });
                })
            }
        })
    } else {
        res.render("home", {
            title: "FastForm",
            loggedIn: req.session.loggedIn,
            userID: req.session.userID
        });
    }
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "FastForm | About",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID
    });
});

app.get("/contact-us", (req, res) => {
    res.render("contact-us", {
        title: "Contact Us",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID
    })
});

app.get("/forms/signin", (req, res) => {
    var breadcrumb = [{
            title: "Help Center",
            ref: "/contact-us"
        },
        {
            title: "Submit a Ticket",
            ref: "/forms"
        },
        {
            title: "Report a Problem",
            ref: "/forms/signin"
        }
    ];

    res.render("loginIssues", {
        title: "Request help signing into your account. | Help Center",
        trail: breadcrumb,
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        extra: "extraVar"
    });
});

app.get("/drivers-license", (req, res) => {
    res.redirect("/drivers-license/new-app");
});

app.get("/drivers-license/new-app", async (req, res) => {
    var user;
    if(req.session.loggedIn) {
        await models.users.findById(req.session.userID, (err, found) => {
            if(!err&&found) {
                user = found;
            }
        });
    }
    res.render("form", {
        title: "FastForm - Driver's License Application",
        application: "Driver's License",
        data: "drivers-license",
        loggedIn: req.session.loggedIn,
        user: user
    });
});

app.get("/login", (req, res) => {
    var wrongLogin = req.query.login;
    res.render("login", {
        title: "FastForm | Login",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        wrongLogin: wrongLogin
    });
});

app.get("/register", (req, res) => {
    var exist = req.query.exist;
    res.render("form", {
        title: "FastForm | Register",
        application: "Create Account",
        data: "register",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        exist: exist
    })
});

app.get("/registered", (req, res) => {
    res.render("registered", {
        title: "FastForm | Success",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID
    });
});

app.get("/in-use", (req, res) => {
    res.render("in-use");
});

app.get("/log-out", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.send(err);
            } else {
                return res.redirect("/");
            }
        })
    }
});

app.get("/all-apps", async (req, res)=>{
    if(checkAuth(req.session)) {
        var apps;
        await models.apps.find((err, found)=>{
            if(!err && found) {
                apps = found;
            }
        })
        res.render("all-apps", {
            apps: apps,
            selected: "all"
        });
    } else {
        res.redirect("/");
    }
});

app.get("/all-apps/:filter", async (req, res)=>{
    if(checkAuth(req.session)) {
        var apps;
        await models.apps.find({status: req.params.filter}, (err, found)=>{
            if(!err && found) {
                apps = found;
            }
        })
        res.render("all-apps", {
            apps: apps,
            selected: req.params.filter
        });
    } else {
        res.redirect("/");
    }
});

app.get("/applications", async (req, res)=>{
    if(await req.session.loggedIn) {
        var apps;
        await models.apps.find({user_id: req.session.userID}, (err, found)=>{
            if(!err && found) {
                apps = found;
            }
        })
        res.render("my-apps", {
            loggedIn: req.session.loggedIn,
            apps: apps,
            selected: "all"
        });
    } else {
        res.redirect("/");
    }
});

app.get("/applications/:filter", async (req, res)=>{
    if(await req.session.loggedIn) {
        var apps;
        await models.apps.find({user_id: req.session.userID, status: req.params.filter}, (err, found)=>{
            if(!err && found) {
                apps = found;
            }
        })
        res.render("my-apps", {
            apps: apps,
            selected: req.params.filter
        });
    } else {
        res.redirect("/");
    }
});

app.get("*", (req, res) => {
    res.render("404", {
        back: (req.headers.referer) ? req.headers.referer : "/",
        loggedIn: req.session.loggedIn,
        userID: req.session.userID
    });
});

module.exports = app;

function checkAuth(session) {
    return (session.loggedIn && session.admin);
}