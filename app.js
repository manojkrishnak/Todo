var express = require("express");
var todoController = require("./controller/todoController");

var app = express();

//set ejs as template engine
app.set("view engine", "ejs");

//setting up static files
app.use(express.static("./public"));

//fire Controller
todoController(app);

app.listen(3000);
console.log("Im listening in port:3000");



