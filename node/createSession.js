const mongoose = require('mongoose'),
session = require('express-session'),
MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 1440
    }
}));