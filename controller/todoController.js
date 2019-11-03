var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//connect to monogdb using mongoose
mongoose.connect("mongodb+srv://USERNAME:PASSWORD@cluster0-xuaju.mongodb.net/todo?retryWrites=true&w=majority", { useNewUrlParser: true });


//create schema - this is a blueprint 
var todoSchema = new mongoose.Schema({
  item: String
});

//schema 
var Todo = mongoose.model("Todo", todoSchema);

//var data = [{ item: "complete tutorial" }, { item: "change auth system for Openwhisk " }, { item: "Read about taking input in c.ai" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });



module.exports = function (app) {

  app.get("/todo", function (req, res) {
    //get data from Mongo DB and send it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    //get data from Mongo DB and add it mongo db
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    //delete the requested item form mongo db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);

    });
  });
}

