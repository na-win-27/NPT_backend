const mongoose = require("mongoose");

const HangerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    cycleTime: {
      type: Number,
      required: true,
    },
    materialWeight: {
      type: Number,
      required: true,
    },
    runnerWeight: {
      type: Number,
      default:0
    },
    totalWeight: {
      type: Number,
    },
    cavity: {
      type: Number,
      required: true,
    },
    outSourcingPrice:{
      type: Number,
    },
    modeOfSupply:{
      type: String,
      required: true,
      default: 'Manufacture'
    },
    imageUrl:{
      type: String,
      required: true,
      default: ''
    },
    category: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    totalProducedQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: [],
    packingCost:{
      type: Number,
      required: true,
      default: 0.1,
    },
    jobCost:{
      type: Number,
      required: true,
      default: 0.1,
    },
    customers: [{ 
      id: { type: mongoose.Types.ObjectId,
      ref: "Customer" } 
    }],
  },
  { timestamps: true }
);

const Hanger = mongoose.model("Hanger", HangerSchema);
module.exports=Hanger;
