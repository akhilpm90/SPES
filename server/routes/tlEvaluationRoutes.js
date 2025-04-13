import express from "express";

import {createTlEvaluation, getTlEvaluations, getAllTlEvaluations, updateTlEvaluation, deleteTlEvaluation, checkEvaluation} from "../controllers/TlEvaluationController.js"

const router=express.Router();
router.get("/check", checkEvaluation);
router.post("/", createTlEvaluation)

router.get("/:employee_id", getTlEvaluations)
router.get("/", getAllTlEvaluations);
router.put("/:id", updateTlEvaluation)

router.delete("/:id", deleteTlEvaluation)


export default router;