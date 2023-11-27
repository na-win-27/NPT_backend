const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Todo = require("../models/Todo");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

router.post(
  "/create-task",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const taskData = req.body;
      const todo = await Todo.create(taskData);
      res.status(201).json({
        success: true,
        todo,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/all-tasks",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const tasks = await Todo.find()
        .populate({ path: "addedBy" })
        .populate({ path: "closedBy" })
        .populate({ path: "comment", populate: "user" })
        .sort({
          createdAt: -1,
        });
      res.status(201).json({
        success: true,
        tasks,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/task-by-date",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const tasks = await Todo.find({
        createdAt: {
          $gte: startOfDay(new Date(req.query.date)),
          $lte: endOfDay(new Date(req.query.date)),
        },
      })
        .populate({ path: "addedBy" })
        .populate({ path: "closedBy" })
        .populate({ path: "comment", populate: "user" })
        .sort({
          status: 1,
          createdAt:-1
        });
      res.status(201).json({
        success: true,
        tasks,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);





router.get(
    "/mark-closed",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const task = await Todo.findById(req.query.id);
        task.status="done"
        task.closedBy=req.user
        await task.save();
        res.status(201).json({
          success: true,
          task,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  

router.post(
  "/addComment",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const task = await Todo.findById(req.query.id);
      task.comment.push({ user: req.body.user, content: req.body.comment });
      await task.save();
      res.status(201).json({
        success: true,
        task,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
