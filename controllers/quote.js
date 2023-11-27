const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Quote = require("../models/Quote.js");
const Oppurtunity = require("../models/Oppurtunity.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-quote",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const quoteData = req.body;
      const oppurtunity = await Oppurtunity.findById(req.body.oppurtunity)
        
      oppurtunity.stage = "Quote";
      await oppurtunity.save();
      const quote = await Quote.create(quoteData)
      const q=await Quote.findById(quote._id).populate({ path: "hangers.hanger" })
      .populate({ path: "hangers.material" })
      .populate({ path: "hangers.hook" })
      .populate({ path: "hangers.clip" })
      .populate({ path: "hangers.print" })
      .populate({
        path: "customer",
      })
      .exec();;
      oppurtunity.quotes.push(quote._id);
      await oppurtunity.save();
      
      res.status(201).json({
        success: true,
        quote:q,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/edit-quote",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const quoteData = req.body;
      const quote = await Quote.findByIdAndUpdate(quoteData._id, quoteData)
        .populate({ path: "hangers.hanger" })
        .populate({ path: "hangers.material" })
        .populate({ path: "hangers.hook" })
        .populate({ path: "hangers.clip" })
        .populate({ path: "hangers.print" })
        .populate({
          path: "customer",
        })
        .exec();
      quote.revised = true;
      quote.save();
      console.log("Edited");
      res.status(201).json({
        success: true,
        quote,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/all-quotes",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const quotes = await Quote.find()
        .sort({
          createdAt: -1,
        })
        .populate({ path: "customer" })
        .exec();
      res.status(201).json({
        success: true,
        quotes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getQuote",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      
      const quote = await Quote.findById(req.query.id)
        .populate({ path: "hangers.hanger" })
        .populate({ path: "hangers.material" })
        .populate({ path: "hangers.hook" })
        .populate({ path: "hangers.clip" })
        .populate({ path: "hangers.print" })
        .populate({
          path: "customer",
        })
        .exec();
      res.status(201).json({
        success: true,
        quote,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
