var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var task = [];

var groceryList = [];

var complete = [];



app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  task.push(newTask);
  res.redirect("/");
});

app.post("/addGroceryItem", function (req, res) {
  var newGrocery = req.body.newGrocery;
  groceryList.push(newGrocery);
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.post("/removeGrocery", function (req, res) {
  var completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    groceryList.splice(groceryList.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      groceryList.splice(groceryList.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.get("/", function (req, res) {
  res.render("index", { task: task, groceryList: groceryList ,complete: complete });
});

app.listen(3000, function () {
  console.log("ToDo List App Server is running on port 3000!");
});
