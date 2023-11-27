const express = require("express");
const { isAuthenticated,isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const RawMaterial=require("../models/RawMaterial.js");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-material",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materialData = req.body;
      const material = await RawMaterial.create(materialData);
      res.status(201).json({
        success: true,
        material,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);


router.get(
  "/all-materials",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materials = await RawMaterial.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        materials,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



router.get(
  "/material",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materialsByCategory = await RawMaterial.find({category:req.query.category}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        materialsByCategory,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/materials",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materials = await RawMaterial.find({category:'material'}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        materials,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.get(
  "/get-clips",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const clips = await RawMaterial.find({category:'clip'}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        clips,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.get(
  "/get-hooks",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const hooks = await RawMaterial.find({category:'hook'}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        hooks,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-prints",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const prints = await RawMaterial.find({category:'print'}).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        prints,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);







module.exports = router;