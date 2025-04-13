import ManagerEvaluation from "../models/managerEvaluation.js";

// Create a new manager evaluation
export const createManagerEvaluation = async (req, res) => {
    try {
        const evaluation = new ManagerEvaluation(req.body);
        await evaluation.save();
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get evaluations by employee ID
export const getManagerEvaluationsByEmployee = async (req, res) => {
    try {
        const { employee_id } = req.params;
        const evaluations = await ManagerEvaluation.find({ employee_id });
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an evaluation
export const updateManagerEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvaluation = await ManagerEvaluation.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvaluation) {
            return res.status(404).json({ message: "Evaluation not found" });
        }
        res.status(200).json(updatedEvaluation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an evaluation
export const deleteManagerEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvaluation = await ManagerEvaluation.findByIdAndDelete(id);
        if (!deletedEvaluation) {
            return res.status(404).json({ message: "Evaluation not found" });
        }
        res.status(200).json({ message: "Evaluation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const checkEvaluationExists = async (req, res) => {
    try {
        const { employee_id, month, year } = req.query;

        if (!employee_id || !month || !year) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const evaluation = await ManagerEvaluation.findOne({
            employee_id,
            month: parseInt(month),
            year: parseInt(year),
        });

        res.json({ exists: !!evaluation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};