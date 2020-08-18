const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const employeeroutes = require("./routes/employee");
const timeoffroutes = require("./routes/timeoff");
const shiftoffroutes = require("./routes/shifts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://chan:chan1234@cluster0-uqtcp.mongodb.net/node-angular?retryWrites=true&w=majority"
    ,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Connection Established..!");
  })
  .catch(() => {
    console.log("Connection Not Established..!");
  });

  app.use(bodyParser.json());
  app.use("/uploads",express.static(path.join("backend/uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/employee", employeeroutes);
app.use("/api/timeoff", timeoffroutes);
app.use("/api/shifts", shiftoffroutes);

module.exports = app;
