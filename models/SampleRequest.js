const mongoose = require("mongoose");

const SampleRequestSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    hangers: {
      type: [
        {
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Hanger",
          },
          quantity: { type: Number, required: true, default: 0 },
          colour: { type: mongoose.Types.ObjectId, ref: "RawMaterial" },
        },
      ],
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    oppurtunity: {
      type: mongoose.Types.ObjectId,
      ref: "Oppurtunity",
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Open",
    },
    deliveryDetails: {
      type:String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const SampleRequest = mongoose.model("SampleRequest", SampleRequestSchema);
module.exports = SampleRequest;
