import Customer from "../models/Customer.js";
import Oppurtunity from "../models/Oppurtunity.js";
import User from "../models/User.js";

export const createOppurtunity=async(req, res, next) => {
    const opportunity=new Oppurtunity(req.body);
    await opportunity.save();
    res.send(opportunity);
}


export const getOpportunities=async(req, res, next) => {
    const opportunities=await Oppurtunity.find()
    res.send(opportunities);
}

export const getOpportunity=async(req, res, next) => {
    const id =req.query.id
    const opportunities=await Oppurtunity.findById(id)
    res.send(opportunities);
}

export const putOpportunity=async(req, res, next) => {
    const id =req.query.id
    const opportunities=await Oppurtunity.findById(id)
    opportunities=req.body;
    await opportunities.save();
    res.send(opportunities);
}

export const deleteOpportunity=async(req, res, next) => {
    const id =req.query.id
    const opportunities=await Oppurtunity.findByIdAndDelete(id)
    res.send(opportunities);
}

export const postUser=async(req, res, next) => {
    const user=new User(req.body);
    await user.save();
    res.send(user);
}


export const getUsers=async(req, res, next) => {
    const users=await User.find();
    res.send(users);
}


export const getUser=async(req, res, next) => {
    const id =req.query.id
    const user=await User.findById(id)
    res.send(user);
}


export const postCustomer=async(req, res, next) => {
    const customer=new Customer(req.body);
    await customer.save();
    res.send(customer);
}


