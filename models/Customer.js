const mongoose = require("mongoose");


const CustomerSchema = new mongoose.Schema(
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
      default:"",
      max: 50,
      unique: true,
    },
    billingAddress: {
      type: {},
    },
    shippingAddress: {
      type: {},
    },
    gstin:{
      type: String,
      required: true,
      default:"",
    },
    status:{
      type: String,
      required: true,
      default:"Inactive",
    },
    contactName: {
      type:String ,
      required:true,
      default:"",
    },
    phoneNumber: {
      type:String ,
      required:true,
      default:"",
    },
    buyerCategory:{
      type: String,
      required:true,
      default:"",
    },
    handledBy:{
      type: String,
      required:true,
      default:"",
    },
    purchase:{
      type: {
        name:{
          type:String,
        },
        mobile:{
          type:String,
        },
        email:{
          type:String,
        },
      }
    },
    accountant:{
      type: {
        name:{
          type:String,
        },
        mobile:{
          type:String,
        },
        email:{
          type:String,
        },
      }
    },
    merchandiser:{
      type: {
        name:{
          type:String,
        },
        mobile:{
          type:String,
        },
        email:{
          type:String,
        },
      }
    },
    paymentTerms:{
      type:String,
      required:true,
      default:""
    },
    transporter:{
      type:{},
    },
    transactions:[],
    hangers:[{
      id:{
        type: mongoose.Types.ObjectId, 
        ref: "Hanger"
      },
    }]
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports=Customer;
