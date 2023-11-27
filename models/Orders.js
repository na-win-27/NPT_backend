const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    deliveredHangers: {
      type: [
        {
          hanger: {
            type: mongoose.Types.ObjectId,
            ref: "Hanger",
          },
          material:{
            type: mongoose.Types.ObjectId,
            ref: "RawMaterial",
          },
          quantity: { type: Number, default: 0, required: true },
        },
      ],
    },

    hangers: {
      type: [
        {
          hanger: {
            type: mongoose.Types.ObjectId,
            ref: "Hanger",
          },
          material:{
            type: mongoose.Types.ObjectId,
            ref: "RawMaterial",
          },
          hook:{
            type:mongoose.Types.ObjectId,
            ref:"RawMaterial"
          },
          clip:{
            type:mongoose.Types.ObjectId,
            ref:"RawMaterial"
          },
          print:{
            type:mongoose.Types.ObjectId,
            ref:"RawMaterial"
          },
          quantity: { type: Number, default: 0, required: true },
        },
      ],
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "Open",
    },
    jobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "JobOrder",
        default: [],
      },
    ],
    supplyDate: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default:"NPT ORDER"
    },
    orderNo: {
      type: String,
      required: true,
    },
    customerOrderNo: {
      type: String,
      required: true,
    },
    paymentTerms: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrdersSchema);
module.exports = Order;
