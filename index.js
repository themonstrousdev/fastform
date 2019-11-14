var express = require("express"), bodyParser = require("body-parser"), app = express();

app.set(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index");
});



app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});