const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Customer = require("../models/Customer");
const router = express.Router();
const Oppurtunity = require("../models/Oppurtunity.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-oppurtunity",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const oppurtunityData = req.body;
      // oppurtunityData.sampleRequest=[];
      const customer = await Customer.findById(req.body.customer);
      customer.status = "Active";

      const oppurtunity = await Oppurtunity.create(oppurtunityData);
      oppurtunity.customer=customer
      customer.save();
      res.status(201).json({
        success: true,
        oppurtunity,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/edit-oppurtunity",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const oppurtunityData = req.body;
      // oppurtunityData.sampleRequest=[];
      const customer = await Customer.findById(req.body.customer);
      customer.status = "Active";
      const oppurtunity = await Oppurtunity.findByIdAndUpdate(oppurtunityData._id,oppurtunityData);
      oppurtunity.customer=customer
      customer.save();
      res.status(201).json({
        success: true,
        oppurtunity,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/all-oppurtunities",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const oppurtunities = await Oppurtunity.find()
        .sort({
          createdAt: -1,
        })
        .populate({ path: "customer" })
        .populate({
          path: "sampleRequest",
          populate: {
            path: "hangers.id",
          },
        })
        .populate({
          path: "sampleRequest",
          populate: { path: "hangers.colour" },
        })
        .populate({ path: "quotes", populate: { path: "hangers" } })
        .populate({ path: "orders" })

        .exec();
      res.status(201).json({
        success: true,
        oppurtunities,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
