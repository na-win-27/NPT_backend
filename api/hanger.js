const express = require("express");
const { isAuthenticated,isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Hanger=require("../models/Hanger.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-hanger",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const hangerData = req.body;
      const hanger = await Hanger.create(hangerData);
      res.status(201).json({
        success: true,
        hanger,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);


router.get(
  "/all-hangers",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const hangers = await Hanger.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        hangers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.get(
  "/getHangerByCategory",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const hangers = await Hanger.find({category:req.query.category}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        hangers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;