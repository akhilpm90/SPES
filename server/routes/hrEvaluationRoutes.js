import express from "express";
import {
  addHrEvaluation,
  getAllHrEvaluations,
  getHrEvaluationByEmployee,
  updateHrEvaluation,
  deleteHrEvaluation,
  checkHrEvaluationExists
} from "../controllers/hrEvaluationController.js";

const router = express.Router();

// Add HR evaluation
router.post("/add", addHrEvaluation);

// Get all evaluations
router.get("/all", getAllHrEvaluations);

// Get evaluation by employee ID
router.get("/:employee_id", getHrEvaluationByEmployee);

// Update evaluation by ID
router.put("/update/:id", updateHrEvaluation);

// Delete evaluation by ID
router.delete("/delete/:id", deleteHrEvaluation);

router.get("/check/exist", checkHrEvaluationExists);

export default router;