import mongoose from "mongoose";

const hrEvaluationSchema = new mongoose.Schema({
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
    leaveCount: {
        type: Number,
        required: true,
        min: 0
    },
    unplannedLeaveCount: {
        type: Number,
        required: true,
        min: 0
    },
    leaveReasonComments: {
        type: String,
        default: ""
    },
    policyComplianceIncident: {
        type: Number,
        required: true,
        min: 0
    },
    punctuality: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    attendanceRegularity: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    discipline: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    teamCollaboration: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    initiative: {
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

hrEvaluationSchema.pre("save", function (next) {
    const hr_total =
        this.punctuality +
        this.attendanceRegularity +
        this.discipline +
        this.teamCollaboration +
        this.initiative;

    this.averageScore = hr_total / 5; // Number of evaluation fields
    next();
});

hrEvaluationSchema.index({ employee_id: 1, month: 1, year: 1 }, { unique: true });

const HrEvaluation = mongoose.model("HrEvaluation", hrEvaluationSchema);

export default HrEvaluation;
