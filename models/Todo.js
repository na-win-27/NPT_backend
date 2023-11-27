const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    task: {
      required: true,
      type: String,
    },
    comment: [{
      type: {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        content: { type: String, required: true, default: "Completed" },
      },
      default:[],
    }],
    status: {
      type: String,
      required: true,
      default: "Open",
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    closedBy:{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
