const multer = require('multer'),
    gridStorage = require('multer-gridfs-storage'),
    stream = require('gridfs-stream'),
    override = require('method-override'),
    conn = require("./connectDB"),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    path = require('path'),
    crypto = require('crypto');

app.use(override('_method'));

//initialize gridfs
let gfs;

conn.once('open', ()=>{
    gfs = stream(conn.db, mongoose.mongo);
    gfs.collection('requirements');
});

// storage engine
const storage = new gridStorage({
    url: 'mongodb://localhost:27017/fast-form',
    file: (req, file) =>{
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'requirements'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

module.exports = upload;