import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    customer:{
      type: String,
      required: true,
    },
    jobOrderNo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "open",
    },
    hanger: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Elastic",
          },
          quantity: { type: Number },
        },
      ],
      required: true,
    },
    wastageElastic: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Wastage",
          },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
    packedElastic: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Elastic",
          },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
    producedElastic: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Elastic",
          },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
    rawMaterialsRequirements: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "RawMaterial",
          },
          quantity: { type: Number },
        },
      ],
      required: true,
    },
    po_id: {
      type: mongoose.Types.ObjectId,
      ref: "Orders",
    },
    shiftDetails: [
      {
        date: {
          type: Date,
          required: true,
        },
        shift:{
          type: String,
          required: true,
        },
        description:{
          type: String,
          required: true,
        },
          
        production:{
          type: Number,
        },
        employee: { type: mongoose.Types.ObjectId, ref: "Employee" },
        machine: { type: mongoose.Types.ObjectId, ref: "Machine" },
        stage: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const JobOrder = mongoose.model("Job", JobSchema);
export default JobOrder;
