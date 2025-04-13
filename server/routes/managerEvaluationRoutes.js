import express from "express";
import {createManagerEvaluation, getManagerEvaluationsByEmployee,updateManagerEvaluation, deleteManagerEvaluation, checkEvaluationExists } from "../controllers/managerEvalController.js"

const router = express.Router();

// Route to create a new manager evaluation
router.post("/add", createManagerEvaluation);

router.get("/check/exist", checkEvaluationExists);

// Route to get evaluations by employee ID
router.get("/:employee_id", getManagerEvaluationsByEmployee);

// Route to update an evaluation by ID
router.put("/:id", updateManagerEvaluation);

// Route to delete an evaluation by ID
router.delete("/:id", deleteManagerEvaluation);



export default router;
