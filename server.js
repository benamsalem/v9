/*****************************
 *                           *
 *  Exercises & User Server  *
 *                           *
 *************************** */

//=================================================
//            Dependencies
//==================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exercisesController = require("./controllers/exercise");
const userController = require("./controllers/user");

//===================================================
// Environment Variables (ready for Heroku)
//===================================================

const PORT = process.env.PORT || 3001;
const db = mongoose.connection;
const app = express();
const mongoURI =
  process.env.MONGODB_URI || "mongodb+srv://ben:ben!@#$%^@cluster0-xfqpx.mongodb.net/Cluster0?retryWrites=true";

//=================================================
//                Middleware
//==================================================

app.use(cors());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static("public"));

app.use("/exercises", exercisesController); //see this in browser
app.use("/users", userController); //see this in browser

// =================================================
//          Connect to Mongo
// =================================================

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log("MongoDB connection established:", mongoURI)
);

// =================================================
//      Error / Disconnection
// =================================================
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("disconnected", () => console.log("mongo disconnected"));

//=======================================================
//                  PORT 3000
//=======================================================
app.listen(PORT, () => {
  console.log(`Ascoltando alla porta, ${PORT} => I am learning hebrew`);
});
