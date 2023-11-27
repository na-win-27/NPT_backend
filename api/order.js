const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Customer = require("../models/Customer");
const router = express.Router();
const Order = require("../models/Orders.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orderData = req.body;
      const order = await Order.create(orderData)
      const o=await Order.findById(order._id)
        .populate({ path: "customer" })
        .populate({ path: "hangers.hanger" })
        .populate({ path: "hangers.material" })
        .populate({ path: "hangers.hook" })
        .populate({ path: "hangers.clip" })
        .populate({ path: "hangers.print" })
        .exec();
      const customer = await Customer.findById(req.body.customer);
      customer.status = "Active";
      res.status(201).json({
        success: true,
        order:o,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/edit-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orderData = req.body;
      const order = await Order.findByIdAndUpdate(orderData._id, orderData)
        .populate({ path: "customer" })
        .populate({ path: "hangers.hanger" })
        .populate({ path: "hangers.material" })
        .populate({ path: "hangers.hook" })
        .populate({ path: "hangers.clip" })
        .populate({ path: "hangers.print" })
        // .populate({ path: "deliveredHangers.id" })
        .exec();
      
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/all-orders",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find()
        .sort({
          createdAt: -1,
        })
        .populate({ path: "customer" })
        .exec();
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/order",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.query.id)
        .populate({ path: "customer" })
        .populate({ path: "hangers.hanger" })
        .populate({ path: "hangers.material" })
        .populate({ path: "hangers.hook" })
        .populate({ path: "hangers.clip" })
        .populate({ path: "hangers.print" })
        // .populate({ path: "deliveredHangers.id" })
        .exec();
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
