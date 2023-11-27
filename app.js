const express = require("express");
const ErrorHandler = require("./middleware/error.js");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./controllers/user.js")
const customer=require("./controllers/customer.js");
const hanger=require("./controllers/hanger.js");
const rawMaterial=require("./controllers/rawMaterial.js");
const oppurtunity=require("./controllers/oppurtunity");
const sample=require("./controllers/sample.js");
const quote=require("./controllers/quote.js");
const order=require("./controllers/order.js");
const todo=require("./controllers/todo.js");

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