const express = require("express"),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require("body-parser"),
    fileUpload = require('express-fileupload'),
    cookieParser = require('cookie-parser');
    app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

require('./node/connectDB');

// my codes
const getRequests = require('./node/get'),
    postRequests = require('./node/post');

app.use(cookieParser());
app.use(session({
    secret: 'please pass me sir gran',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 1440
    }
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

// ROUTERS
app.use(getRequests);
app.use(postRequests);


// BOOT UP THE SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});