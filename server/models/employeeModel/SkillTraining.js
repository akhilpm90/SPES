import mongoose from 'mongoose';

const SkillsTrainingSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  skills: [{ type: String }],
  trainingCompleted: [{ type: String }], // List of training programs
  certifications: [{ type: String }], // List of certifications
  areasForImprovement: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('SkillsTraining', SkillsTrainingSchema);