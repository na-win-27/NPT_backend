const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Customer = require("../models/Customer");
const Oppurtunity = require("../models/Oppurtunity");
const router = express.Router();
const SampleRequest = require("../models/SampleRequest.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-sample",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sampleData = req.body;
      if (req.body.oppurtunity) {
        const oppurtunity = await Oppurtunity.findById(req.body.oppurtunity);
        oppurtunity.stage = "Sample";
        const sample = await SampleRequest.create(sampleData);
        oppurtunity.sampleRequest.push(sample._id);
        await oppurtunity.save();
        const s=await SampleRequest.findById(sample._id)
          .populate({ path: "addedBy" })
          .populate({ path: "hangers.id" })
          .populate({ path: "hangers.colour" })
          .populate({
            path: "customer",
          })
          .exec();
        res.status(201).json({
          success: true,
          sample:s,
        });
      } else {
        const oppurtunity = await Oppurtunity.create({
          customer: req.body.customer,
          stage: "Sample",
          description: req.body.description,
        });
        const customer = await Customer.findById(req.body.customer);
        customer.status = "Active";

        const sample = await SampleRequest.create(sampleData);
        oppurtunity.sampleRequest.push(sample._id);
        await oppurtunity.save();
        await customer.save();

        const s=await SampleRequest.findById(sample._id)
          .populate({ path: "addedBy" })
          .populate({ path: "hangers.id" })
          .populate({ path: "hangers.colour" })
          .populate({
            path: "customer",
          })
          .exec();
        res.status(201).json({
          success: true,
          sample:s,
        });
      }
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post(
  "/edit-sample",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sampleData = req.body;
      const sample = await SampleRequest.findByIdAndUpdate(
        sampleData._id,
        sampleData
      )
        .populate({ path: "addedBy" })
        .populate({ path: "hangers.id" })
        .populate({ path: "hangers.colour" })
        .populate({
          path: "customer",
        })
        .exec();
      console.log("edited");
      res.status(201).json({
        success: true,
        sample,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/all-samples",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const samples = await SampleRequest.find()
        .populate({ path: "addedBy" })
        .populate({ path: "customer" })
        .sort({
          createdAt: -1,
        });
      res.status(201).json({
        success: true,
        samples,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getsample",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      
      const sample = await SampleRequest.findById(req.query.id)
        .populate({ path: "addedBy" })
        .populate({ path: "hangers.id" })
        .populate({ path: "hangers.colour" })
        .populate({
          path: "customer",
        })
        .exec();
      res.status(201).json({
        success: true,
        sample,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/sampleDelivered",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sample = await SampleRequest.findById(req.query.id);
      sample.status = "Sent";
      sample.deliveryDetails = req.body.deliveryDetails;
      res.status(201).json({
        success: true,
        sample,
      });
      await sample.save();
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
