const express = require("express"),
    app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// my codes
require('./node/connectDB');
const getRequests = require('./node/get'),
      postRequests = require('./node/post');

app.use(getRequests);
app.use(postRequests);


// BOOT UP THE SERVER
app.listen(3000, ()=>{
   console.log("Server running on port 3000");
});