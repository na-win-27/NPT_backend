import express from "express";
import { createOppurtunity, getOpportunities, getOpportunity, putOpportunity ,deleteOpportunity} from "../controllers/general.js";

const router = express.Router();


router.post('/oppurtunity',createOppurtunity)

router.get('/oppurtunities',getOpportunities)

router.get('/oppurtunity',getOpportunity);

router.put('/oppurtunity',putOpportunity);

router.delete('/oppurtunity',deleteOpportunity);

export default router