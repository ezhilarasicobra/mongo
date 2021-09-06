const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
//urlstructuring dbprotocal://localhost(i.e)ipaddress:portnumber/dbname
const url = "mongodb://localhost:27017";
app.use(express.json());
//const tasks = [];
app.get("/products", (req, res) => {
  
});
app.post("/createtask",async (req, res) => {
 try {
   //connect to the database
  let client = await  mongoclient.connect(url);
  //select the db
  let db=client.db("todo_app");
  //select the collection and perform the action
let data=db.collection("tasks").insertOne(req.body);
//close the connection
 await client.close();
res.json({
  message:"Task created successfully"
})
 } catch (error) {
   res.status(500).json({
     message:"something went wrong"
   })
 }
});
app.put("/updatetask/:id", (req, res) => {
  let selecttask = tasks.findIndex((obj) => obj.id == req.params.id);
  if (selecttask != -1) {
    tasks[selecttask].status = req.body.status;
    res.json({
      message: "task Updated",
    });
  } else {
    res.status(400).json({
      message: "No task found",
    });
  }
});
app.delete("/deletetask/:id", (req, res) => {
  let selecttask = tasks.findIndex((obj) => obj.id == req.params.id);
  if (selecttask != -1) {
    tasks.splice(selecttask, 1);
    res.json({
      message: "deleted",
    });
  } else {
    res.status(400).json({
      message: "no tasks",
    });
  }
});
app.listen(3000, () => {
  console.log("the port is listening in 3000");
});
