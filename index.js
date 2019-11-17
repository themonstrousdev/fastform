var express = require("express"), 
    bodyParser = require("body-parser"), 
    app = express();

app.set(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("home", {title: "FastForm"});
});

app.get("/about", (req, res)=>{
    res.render("about", {title: "FastForm | About"});
});

app.get("/contact-us", (req, res)=>{
    res.render("contact-us", {title: "Contact Us"})
});

app.get("/forms/signin", (req, res) =>{
    var breadcrumb = [
        {title: "Help Center", ref: "/contact-us"},
        {title: "Submit a Ticket", ref: "/forms"},
        {title: "Report a Problem", ref: "/forms/signin"}
    ];

    res.render("loginIssues", {title: "Request help signing into your account. | Help Center", trail: breadcrumb});
});

app.get("/drivers-license", (req, res)=>{
    res.redirect("/drivers-license/type");
});

app.get("/drivers-license/type", (req, res)=>{
    res.render("form", {title: "FastForm - Driver's License Application", application: "Driver's License", data: "drivers-license"});
});

app.get("/drivers-license/new-app", (req, res)=>{
    res.render("form", {title: "FastForm - Driver's License Application", application: "Driver's License", data: "drivers-license"});
});

app.get("*", (req, res)=>{
    res.render("404", {back: (req.headers.referer) ? req.headers.referer : "/"});
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});


// functions

function isValid(num) {
    var valid;
    fetch(`http://apilayer.net/api/validate?access_key=83698416089a60ed337a058fd2bfd924&number=${num}&country_code=PH`)
    .then(res=>{
        return res.json();
    }).then(data=>{
        valid = data.valid;
    });

    return valid;
}