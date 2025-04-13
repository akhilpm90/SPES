import { getAverageScores } from "../models/averageEvaluation.js";

export const fetchAverageScores = async (req, res) => {
    try {
        const result = await getAverageScores();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};