const mongoose = require('mongoose');
var models = {};

const ApplicationSchema = mongoose.Schema({
    dateSubmitted: {type: Date, default: Date.now, required: true},
    dateProcessed: {type: Date},
    status: {type: String,default: "Pending"},
    user_id: {type: String, default: 'guest'},
    appInfo: {
        firstname: {type:String, required: true},
        lastname: {type:String, required: true},
        citizenship: {type:String, required: true},
        street: {type:String, required: true},
        city_country: {type:String, required: true},
        zip: {type:String, required: true},
        gender: {type:String, required: true},
        birthday: {type:Date, required: true},
        height: {type:Number, required: true},
        weight: {type:Number, required: true},
        contactNo: {type:Number, required: true},
        bloodType: {type:String, required: true},
        organDonor: {type:Boolean, required: true},
        civilStat: {type:String, required: true},
        build: {type:String, required: true},
        complex: {type:String, required: true},
        eye_color: {type:String, required: true},
        otherEyes_input: {type:String},
        hair_color: {type:String, required: true},
        otherHair_input: {type:String},
        birthplace: {type:String, required: true},
        fatherName: {type:String},
        motherName: {type:String},
        spouseName: {type:String},
        business_name: {type:String},
        business_num: {type:Number},
        business_add: {type:String},
        appType: {type:String}
    }
});

const UserSchema = mongoose.Schema({
    national_id: {
        type:Number,
        required:true,
        unique:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLengt:255
    },
    birthday:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    isAdmin: Boolean
});

models.apps = mongoose.model('Application', ApplicationSchema);
models.users = mongoose.model('User', UserSchema);

module.exports = models;










// const NewsSchema = mongoose.Schema({
//     newsTitle: {type: String, required: true},
//     newsAuthor: {type: String, required: true}, // adding required: true to a property in your schema will make                                                it so that it will WANT this property filled. Otherwise, it                                                 will return an error.
//     newsDetails: {type: String, required: true},
//     newsType: {type: String}
//     // add as needed
// });

// const News = mongoose.model('News', NewsSchema); // 'News' becomes the collection name

// const suggestedNews = News.find({newsType: "suggested"}); // this will return all entries that has "newstype"                                                                 set to suggested

// app.post("/route", (req, res) => {
//     res.render("posts", {news: suggestedNews});
// });