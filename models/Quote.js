const mongoose=require('mongoose')

const QuoteSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    quoteNo: {
      type: String,
    },
    revised:{
      type:Boolean
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
          price: { type: Number, required: true, default: 0 },
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
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports=Quote;
