import express from "express";
import { fetchAverageScores } from "../controllers/averageEvaluationController.js";

const router = express.Router();

// Route to fetch average total score for each month
router.get("/average-scores", fetchAverageScores);

export default router;