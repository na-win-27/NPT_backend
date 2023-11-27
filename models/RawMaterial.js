const mongoose = require("mongoose");



const RawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    minStock: {
      type: Number,
      required: true,
    },
    plannedQuantity: {
      type: Number,
    },
    category:{
      type:String,
      required:true,
    },
    materialCategory:{
      type:String,
      default:"None"
    },
    unit:{
      type:String,
      required:true,
    },
    
    transactions:[],
  },
  { timestamps: true }
);

const RawMaterial = mongoose.model("RawMaterial", RawMaterialSchema);
module.exports=RawMaterial;
