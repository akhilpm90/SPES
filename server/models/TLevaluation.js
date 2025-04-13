import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
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
    taskCompletion: {
        type: Number,
        required: true,
        min: 0,
        max: 10 
    },
    workAccuracy: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    productivity: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    achievementOfGoals: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    coreJobSkills: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    deadlineCompliance: {
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

// Pre-save middleware to calculate average score
evaluationSchema.pre("save", function (next) {
    const tl_total =
        this.taskCompletion +
        this.workAccuracy +
        this.productivity +
        this.achievementOfGoals +
        this.coreJobSkills +
        this.deadlineCompliance;
    
    this.averageScore = tl_total / 6; // Number of evaluation fields
    next();
});

evaluationSchema.index({ employee_id: 1, month: 1, year: 1 }, { unique: true });

const TlEvaluation = mongoose.model("TlEvaluation", evaluationSchema);

export default TlEvaluation;
