import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  totalWorkingHours: { type: Number, required: true },
  daysPresent: { type: Number, required: true },
  daysAbsent: { type: Number, required: true },
  lateArrivals: { type: Number, required: true },
  leaveTaken: { type: Number, required: true },
  leaveBalance: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Attendance', AttendanceSchema);