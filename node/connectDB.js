const mongoose = require('mongoose'),
    mongoURI = 'mongodb://localhost:27017/fast-form';
var conn;
async function mongoConnect(url){
    conn = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error)=> {
        if(error) {
            console.log(error);
        } else {
            console.log("Connected to the database.");
        }
    });
}

mongoConnect(mongoURI);

module.exports = conn;