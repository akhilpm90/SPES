import express from "express";
import { getTeamProductivity, getMonthlyEfficiency } from "../controllers/TeamProductivityController.js";

const router = express.Router();

router.get("/", getTeamProductivity); 
router.get("/monthly-efficiency", getMonthlyEfficiency)
export default router;