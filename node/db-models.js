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
    },
    req: {
        medCert: {type:File,}
    }
});

models.apps = mongoose.model('Applications', ApplicationSchema);

module.exports = models;