const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userModel = require("./model");
const cors = require("cors");

let app = express();

app.use(bodyParser.json());
app.use(cors());

// this rule is for express .
// to give that express to some variable .

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

// app.get("/show", (req, res) => {
//   res.send("Welcome to node.js hell boy");
// });

// for creating an api

app.post("/create", (req, res) => {
  const user = userModel(req.body);
  user
    .save()
    .then((used) => {
      res.status(200).send(used);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// for  getting the api data.

app.get("/show", async (req, res) => {
  const data = await userModel.find();
  res.status(200).send(data);
});

// for getting one specific data by id....

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModel.findById(id);
  res.send(data);
});

// for delete the data by getting the id ...

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModel.findByIdAndDelete(id);
  res.send(data);
});

// for update the data by getting the id ...

app.put("/put/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const data = await userModel.findByIdAndUpdate(id, user);
  res.send(data);
});
// for datbase connection
mongoose.connect("mongodb://127.0.0.1:27017/firstDatabase ", {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () =>
  console.log("Database connected successfully")
);
