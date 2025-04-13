
import mongoose from 'mongoose';
const PerformanceSchema = new mongoose.Schema({
  employeeID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  overallRating: { type: Number, min: 0, max: 5, required: true },
  kpiScore: { type: Number, required: true },
  taskCompletionRate: { type: Number, min: 0, max: 100, required: true },
  goalsAchieved: { type: Number, required: true },
  feedback: { type: [String], default: [] },
  attendanceHistory: [
    {
        month: { type: String, required: true }, // e.g., "2025-02"
        attendance: { type: Number, required: true }, // e.g., 90%
    }
]
}, { timestamps: true });

export default mongoose.model('Performance', PerformanceSchema, 'performance');