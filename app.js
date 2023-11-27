const express = require("express");
const ErrorHandler = require("./middleware/error.js");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./api/user.js")
const customer=require("./api/customer.js");
const hanger=require("./api/hanger.js");
const rawMaterial=require("./api/rawMaterial.js");
const oppurtunity=require("./api/oppurtunity");
const sample=require("./api/sample.js");
const quote=require("./api/quote.js");
const order=require("./api/order.js");
const todo=require("./api/todo.js");

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v2/user", user);
app.use("/api/v2/customer", customer);
app.use("/api/v2/hanger", hanger);
app.use("/api/v2/rawMaterial", rawMaterial);
app.use("/api/v2/oppurtunity", oppurtunity);
app.use("/api/v2/sample", sample);
app.use("/api/v2/quote", quote);
app.use("/api/v2/order", order);
app.use("/api/v2/task", todo);



// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports=app;