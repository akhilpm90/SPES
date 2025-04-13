import mongoose from "mongoose";

const managerEvaluationSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },
    contribution: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    initiative_and_proactiveness: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    adaptability_and_flexibility: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    communication_and_presentation: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    problem_solving_and_decision_making: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    potential_for_advancement: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    comments: {
        type: String,
        default: ""
    },
    evaluationDate: {
        type: Date,
        default: Date.now
    },
    averageScore: {  // ✅ Define the field before using it
        type: Number,
        default: 0
    }
    
});

managerEvaluationSchema.pre("save", function (next) {
    const manager_total =
        this.contribution +
        this.initiative_and_proactiveness +
        this.adaptability_and_flexibility +
        this.communication_and_presentation +
        this.problem_solving_and_decision_making +
        this.potential_for_advancement;

    this.averageScore = manager_total / 6; // Number of evaluation fields
    next();
});

managerEvaluationSchema.index({ employee_id: 1, month: 1, year: 1 }, { unique: true });

const ManagerEvaluation = mongoose.model("ManagerEvaluation", managerEvaluationSchema);

export default ManagerEvaluation;
