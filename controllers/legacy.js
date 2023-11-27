import Elastic from "../models/Elastic.js";
import Customer from "../models/Customer.js";
import RawMaterial from "../models/RawMaterial.js";
import Complaint from "../models/Complaints.js";
import Employee from "../models/Employee.js";
import Machine from "../models/Machine.js";
import Orders from "../models/Orders.js";
import Wastage from "../models/Wastage.js";
import mongoose from "mongoose";
import Job from "../models/JobOrder.js";
import JobOrder from "../models/JobOrder.js";
import ShiftDetail from "../models/ShiftDetails.js";

/*----------------------------------------------------------------ELASTICS----------------------------------------------------------------*/

export const getElastic = async (req, res) => {
  try {
    const elastic = await Elastic.find()
      .populate("warpSpandex.id")
      .populate("warpYarnBase.id")
      .populate("warpYarnSecond.id")
      .populate("spandexCovering.id")
      .populate("weftYarn.id")
      .populate("customer")
      .exec();
    // console.log(elastic.warpSpandex);
    res.status(200).json(elastic);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJobOrderById = async (req, res) => {
  try {
    console.log("jhi");
    const job = await JobOrder.findById(req.query.id)
      .populate("elastics.id")
      .populate("wastageElastic.id")
      .populate("packedElastic.id")
      .populate("producedElastic.id")
      .populate("rawMaterialsRequirements.id")
      .populate("po_id")
      .populate("shiftDetails.employee")
      .populate("shiftDetails.machine")
      .exec();
    // console.log(elastic.warpSpandex);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJobOrders = async (req, res) => {
  try {
    // console.log("HI")
    const job = await JobOrder.find()
      .populate("elastics.id")
      .populate("po_id")
      .populate("shiftDetails.employee")
      .populate("shiftDetails.machine")
      .exec();

    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRawReq = async (req, res) => {
  try {
    const elastic = req.body.elastic;
    let r = [{ item: "NULL", quantity: 100 }];
    elastic.forEach((e) => {
      if (e) {
        const rubber = e.id.warpSpandex.id.toString();
        const warp1 = e.id.warpYarnBase.id.toString();
        const warp2 = e.id.warpYarnSecond.id.toString();
        const covering = e.id.spandexCovering.id.toString();
        const weft = e.id.weftYarn.id.toString();
        console.log("id", covering);

        const rubberFound = r.findIndex((ele) => ele.item == rubber);
        // console.log("found",rubberFound)
        if (rubberFound > 0) {
          const temp =
            r[rubberFound].quantity + e.id.warpSpandex.weight * e.quantity;
          r[rubberFound] = {
            item: rubber,
            quantity: temp,
          };
        } else {
          r.push({
            item: rubber,
            quantity: e.id.warpSpandex.weight * e.quantity,
          });
        }

        const warp1Found = r.findIndex((ele) => ele.item == warp1);
        if (warp1Found > 0) {
          const temp =
            r[warp1Found].quantity + e.id.warpYarnBase.weight * e.quantity;
          r[warp1Found] = {
            item: warp1,
            quantity: temp,
          };
        } else {
          r.push({
            item: warp1,
            quantity: e.id.warpYarnBase.weight * e.quantity,
          });
        }

        const warp2Found = r.findIndex((ele) => ele.item == warp2);
        // console.log(warp2Found)
        if (warp2Found > 0) {
          const temp =
            r[warp2Found].quantity + e.id.warpYarnSecond.weight * e.quantity;
          r[warp2Found] = {
            item: warp2,
            quantity: temp,
          };
        } else {
          r.push({
            item: warp2,
            quantity: e.id.warpYarnSecond.weight * e.quantity,
          });
        }

        const weftFound = r.findIndex((ele) => ele.item == weft);
        if (weftFound > 0) {
          const temp =
            r[weftFound].quantity + e.id.weftYarn.weight * e.quantity;
          r[weftFound] = {
            item: weft,
            quantity: temp,
          };
        } else {
          r.push({ item: weft, quantity: e.id.weftYarn.weight * e.quantity });
        }

        const coveringFound = r.findIndex((ele) => ele.item == covering);
        // console.log(coveringFound )
        if (coveringFound > 0) {
          const temp =
            r[coveringFound].quantity +
            e.id.spandexCovering.weight * e.quantity;
          r[coveringFound] = {
            item: covering,
            quantity: temp,
          };
        } else {
          r.push({
            item: covering,
            quantity: e.id.spandexCovering.weight * e.quantity,
          });
        }
      }
    });

    // RawMaterial.findById(r[1].item).then((s)=>{
    //   r[1].item=s.name
    //   RawMaterial.findById(r[2].item).then((s)=>{
    //     console.log(s)
    //     r[2].item=s.name
    //   })
    //   RawMaterial.findById(r[3].item).then((s)=>{
    //     console.log(s)
    //    res.send(s)
    //   })
    // })
    r = r.slice(1);
    const qReq = await Promise.all(
      r.map(async (raw) => {
        const material = await RawMaterial.findById(
          mongoose.Types.ObjectId(raw.item)
        );
        //  material.stock=material.stock-(raw.quantity/1000);
        let out = false;
        if (material.stock < 100) {
          out = true;
        }
        const x = {
          item: material.name.toString(),
          quantity: raw.quantity,
          stock: material.stock,
          id: material._id,
          out,
        };
        // const r=new RawMaterial()
        // await material.save();

        return x;
      })
    );
    // r.forEach(async (raw) => {
    //   // console.log("mat",raw)
    //   const material = await RawMaterial.findById(
    //     mongoose.Types.ObjectId(raw.item)
    //   );
    //   //  material.stock=material.stock-raw.quantity;
    //   const x = {
    //     item: material.name.toString(),
    //     quantity: raw.quantity,
    //   };
    //   // console.log(x);
    //   qReq.push(x);
    //   // const r=new RawMaterial()
    //   // await material.save();
    // });

    res.send({
      r: r,
      qreq: qReq,
    });
    //  res.send(r)

    // console.log(elastic);

    // .populate("warpSpandex.id")
    // .populate("warpYarnBase.id")
    // .populate("warpYarnSecond.id")
    // .populate("spandexCovering.id")
    // .populate("weftYarn.id")
    // .populate("customer")
    // .exec()
    // console.log(elastic.warpSpandex);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postRawMaterialApproved = async (req, res) => {
  console.log(req.body);
  const r = req.body.rawMaterialsRequirements;
  const qReq = await Promise.all(
    r.map(async (raw) => {
      const material = await RawMaterial.findById(
        mongoose.Types.ObjectId(raw.item)
      );
      material.stock = material.stock - raw.quantity / 1000;
    })
  );

  const newJobOrder = new JobOrder({
    wastageElastic: req.body.elastics,
    packedElastic: req.body.elastics,
    producedElastic: req.body.elastics,
    ...req.body,
  });

  await newJobOrder.save();
  res.send(newJobOrder);
};

export const postElastic = async (req, res) => {
  const newElastic = new Elastic(req.body);
  await newElastic.save();
  res.send(newElastic);
};

/*----------------------------------------------------------------Customer----------------------------------------------------------------*/

export const postCustomer = async (req, res) => {
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.send(newCustomer);
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCustomerById = async (req, res) => {
  try {
    const data = await Customer.findByIfindByIdAndRemoved(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const putCustomerById = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(
      req.query.id,
      { $set: req.body },
      { new: true }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
/*----------------------------------------------------------------RAW MATERIAL----------------------------------------------------------------*/

export const getRawMaterials = async (req, res) => {
  try {
    const data = await RawMaterial.find();
    // console.log(elastic.warpSpandex);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRawMaterialById = async (req, res) => {
  try {
    const data = await RawMaterial.findById(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRawMaterialById = async (req, res) => {
  try {
    const data = await RawMaterial.findByIfindByIdAndRemoved(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const putRawMaterialById = async (req, res) => {
  try {
    await RawMaterial.findByIdAndUpdate(
      req.query.id,
      { $set: req.body },
      { new: true }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postRawMaterial = async (req, res) => {
  const newRawMaterial = new RawMaterial(req.body);
  await newRawMaterial.save();
  res.send(newRawMaterial);
};

/*----------------------------------------------------------------Complaints----------------------------------------------------------------*/

export const getComplaints = async (req, res) => {
  try {
    const { id } = req.query;
    const complaints = await Complaint.findById(id)
      .populate("Elastic")
      .populate("Customer")
      .exec();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postComplaints = async (req, res) => {
  const newComplaint = new Complaint(req.body);
  await newComplaint.save();
  res.send(newComplaint);
};

/*----------------------------------------------------------------Employee----------------------------------------------------------------*/

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    const employees = await Employee.findById(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postEmployees = async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.send(newEmployee);
};

/*----------------------------------------------Machine-------------------------------*/
export const getMachine = async (req, res) => {
  try {
    const { id } = req.query;
    const machine = await Machine.findById(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMachines = async (req, res) => {
  try {
    const machine = await Machine.find();
    res.send(machine);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postMachine = async (req, res) => {
  const newMachine = new Machine(req.body);
  await newMachine.save();
  res.send(newMachine);
};

/*----------------------------------------------Orders-------------------------------*/
export const getOrders = async (req, res) => {
  try {
    const { id } = req.query;
    const order = await Orders.find()
      .populate("elastic.id")
      .populate("customer")
      .exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.query;
    const order = await Orders.findById(id)
      .populate("elastic.id")
      .populate("customer")
      .exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postOrder = async (req, res) => {
  let body = req.body;
  const packed = body.elastic.map((e) => {
    const x = { id: e.id };
    return x;
  });
  body = { packedElastic: packed, ...body };

  const newOrder = new Orders(body);
  await newOrder.save();
  res.status(200).send(newOrder);
};

/*----------------------------------------------Wastage-------------------------------*/

export const getWastage = async (req, res) => {
  try {
    const { id } = req.query;
    const waste = await Wastage.findById(id)
      .populate("Machine")
      .populate("customer")
      .populate("Employee")
      .exec();
    res.status(200).json(waste);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postWastage = async (req, res) => {
  const newWastage = new Wastage(req.body);
  await newWastage.save();
  res.send(newWastage);
};

/*----------------------------------------------JOB-------------------------------*/
export const getJob = async (req, res) => {
  const pendingOrders = await Job.find({ staus: "open" })
    .populate("Elastic.id")
    .populate("producedElastic.id");
  res.send(pendingOrders);
};

/*----------------------------------------------Production-------------------------------*/
export const getShiftByJob = async (req, res) => {
  const job = await ShiftDetail.find({ job: req.query.id })
    .populate("employee")
    .populate("machine")
    .exec();
  res.send(job);
};

export const postShift = async (req, res) => {
  const newShift = new ShiftDetail(req.body);

  await newShift.save();

  const machine = await Machine.findById(newShift.machine);

  machine.orderRunning = newShift.job;
  await machine.save();
  res.send(newShift);
};

export const getShift = async (req, res) => {
  const job = await ShiftDetail.findById(req.query.id)
    .populate("employee")
    .populate("machine")
    .exec();

  const j = await JobOrder.findById(job.machine.orderRunning)
    .populate("elastics.id")
    .exec();

  res.send({ shift: job, job: j });
};

export const postShiftProduction = async (req, res) => {
  const jobOrder = await Job.findById(req.query.id)
    .populate("elastics.id")
    .populate("producedElastic.id")
    .exec();
  console.log(req.body);
  const elas = req.body;
  elas.map((elast, i) => {
    let e = jobOrder.producedElastic[i];
    // console.log(e);
    if (e.id._id.toString() === elast.id) {
      e.quantity = e.quantity + parseInt(elast.quantity);
    }
  });

  await jobOrder.save();
  res.send({});
};


export const getJobByOrder = async (req, res) => {
  const job = await JobOrder.find({ po_id: req.query.id })
    .exec();
  res.send(job);
};


export const putNextStage = async (req, res) => {
  const job = await JobOrder.findById(req.query.id)
  job.stage=req.body.stage;
  await job.save();
  res.send(job);
};


export const getMarkJobAsClosed = async (req, res) => {
  const job = await JobOrder.findById(req.query.id)
  job.stage="closed";
  job.status="closed";
  await job.save();
  res.send(job)
};

