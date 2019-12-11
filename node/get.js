const express = require('express'),
    app = express.Router();

//middleware
app.get("/", (req, res) => {
    res.render("home", {
        title: "FastForm"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "FastForm | About"
    });
});

app.get("/contact-us", (req, res) => {
    res.render("contact-us", {
        title: "Contact Us"
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
        trail: breadcrumb
    });
});

app.get("/drivers-license", (req, res) => {
    res.redirect("/drivers-license/type");
});

app.get("/drivers-license/type", (req, res) => {
    res.render("form", {
        title: "FastForm - Driver's License Application",
        application: "Driver's License",
        data: "drivers-license"
    });
});

app.get("/drivers-license/new-app", (req, res) => {
    res.render("form", {
        title: "FastForm - Driver's License Application",
        application: "Driver's License",
        data: "drivers-license"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        back: (req.headers.referer) ? req.headers.referer : "/"
    });
});

module.exports = app;