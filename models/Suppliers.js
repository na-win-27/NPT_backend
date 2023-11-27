import mongoose from "mongoose";


const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    gstin:{
      type: String,
      required: true,
    },
    contact: {
      type:String ,
      required: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
