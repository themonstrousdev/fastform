const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
var models = {};

const ApplicationSchema = mongoose.Schema({
    dateSubmitted: {type: Date, default: Date.now, required: true},
    dateProcessed: {type: Date},
    status: {type: String,default: "pending"},
    user_id: {type: String, default: 'guest'},
    reason: {type: String},
    appInfo: {
        national_id: {type: String, required: true},
        application: {type: String, required: true},
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
        fatherName: {type:String, default: "N/A"},
        motherName: {type:String, default: "N/A"},
        spouseName: {type:String, default: "N/A"},
        business_name: {type:String, default: "N/A"},
        business_num: {type:Number},
        business_add: {type:String, default: "N/A"},
        appType: {type:String},
        medCert: {type: String},
        studentsPermit: {type: String}
    }
});

const UserSchema = mongoose.Schema({
    national_id: {
        type:Number,
        required:true,
        unique:true
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
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
        type:Date,
        required:true
    },
    isAdmin: {type: Boolean, default: false}
});

const TaskSchema = mongoose.Schema({
    done: {
        type: Boolean,
        defaut: false,
    },
    user_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

models.apps = mongoose.model('Application', ApplicationSchema);
models.users = mongoose.model('User', UserSchema);
models.tasks = mongoose.model('Task', TaskSchema);

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