const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth");



  
  // login user
  router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");

  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
        const isPasswordValid = user.password==password?true:false;
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/getuser",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
      
        const user = await User.findById(req.user.id);
       
        if (!user) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


  router.get(
    "/all-users",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {

        const users = await User.find({role:"admin"});
       
        if (!users) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          users,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  
  // log out user
  router.get(
    "/logout",
    catchAsyncErrors(async (req, res, next) => {
      try {
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(201).json({
          success: true,
          message: "Log out successful!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  
 

  
  module.exports = router;