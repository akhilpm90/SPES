import mongoose from 'mongoose';

const TeamProductivitySchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    department: { type: String, required: true },
    totalEmployees: { type: Number, required: true },
    
    totalTasksCompleted: { type: Number, default: 0 },  
    averageTaskCompletionTime: { type: Number, default: 0 }, // in hours
    teamEfficiency: { type: Number, default: 0 }, // in percentage
    attendanceRate: { type: Number, default: 0 }, // in percentage

    reportGeneratedOn: { type: Date, default: Date.now } // Timestamp
});

export default mongoose.model('TeamProductivity', TeamProductivitySchema);