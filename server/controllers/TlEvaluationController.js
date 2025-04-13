import TlEvaluation from "../models/TLevaluation.js";
import Employee from "../models/employeemodel/Employee.js"; // Fixed import
import mongoose from "mongoose";

// Create Evaluation
export const createTlEvaluation = async (req, res) => {
    try {
        console.log("🔍 Incoming Evaluation Request:", req.body);
        const { employee_id, month, year, taskCompletion, workAccuracy, productivity, achievementOfGoals, coreJobSkills, deadlineCompliance, comments } = req.body;
        
        const employee = await Employee.findOne({ employeeID: employee_id });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const existingEvaluation = await TlEvaluation.findOne({ employee_id,month, year });
        if (existingEvaluation) {
            return res.status(400).json({ message: "⚠️ Evaluation already exists for this employee." });
        }

        const newEvaluation = new TlEvaluation({
            employee_id,
            month,
            year,
            taskCompletion,
            workAccuracy,
            productivity,
            achievementOfGoals,
            coreJobSkills,
            deadlineCompliance,
            comments
        });

        await newEvaluation.save();
        console.log("✅ Evaluation Saved Successfully:", newEvaluation);
        res.status(201).json({ message: "Evaluation recorded successfully", evaluation: newEvaluation });
    } catch (error) {
        console.error("❌ Error creating evaluation:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Evaluations
export const getTlEvaluations = async (req, res) => {
    try {
        const { employee_id } = req.params;
       
        const evaluations = await TlEvaluation.find({ employee_id: employee_id });
            

        if (!evaluations.length) {
            return res.status(404).json({ message: "No evaluations found for this employee" });
        }
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllTlEvaluations = async (req, res) => {
    try {
        const evaluations = await TlEvaluation.find(); // Get all evaluations

        if (!evaluations.length) {
            return res.status(404).json({ message: "No evaluations found" });
        }

        res.status(200).json(evaluations);
    } catch (error) {
        console.error("❌ Error fetching all TL evaluations:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Update Evaluation
export const updateTlEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvaluation = await TlEvaluation.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedEvaluation) {
            return res.status(404).json({ message: "Evaluation not found" });
        }

        res.status(200).json({ message: "Evaluation updated successfully", evaluation: updatedEvaluation });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Evaluation
export const deleteTlEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvaluation = await TlEvaluation.findByIdAndDelete(id);

        if (!deletedEvaluation) {
            return res.status(404).json({ message: "Evaluation not found" });
        }

        res.status(200).json({ message: "Evaluation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const checkEvaluation = async (req, res) => {
    try {
        const { employee_id, month, year } = req.query;

        const existingEvaluation = await TlEvaluation.findOne({ employee_id, month, year });

        res.status(200).json({ exists: !!existingEvaluation });
    } catch (error) {
        return errorHandler(res, error, "Error checking evaluation");
    }
};