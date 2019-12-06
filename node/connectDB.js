const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost/fast-form', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error)=> {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected to the database.");
    }
});

module.exports = conn;