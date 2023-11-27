const mongoose=require('mongoose');

const OppurtunitySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default:"Hangers NPT"
    },
    refferedBy: {
      type: String,
    },
    buyerCategory: {
      type: String,
    },
    quotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Quote",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    sampleRequest: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SampleRequest",
      },

    ],
  },
  { timestamps: true }
);

const Oppurtunity = mongoose.model("Oppurtunity", OppurtunitySchema);
module.exports=Oppurtunity;
