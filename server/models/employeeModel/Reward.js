import mongoose from 'mongoose';

const RewardsSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    awards: [{ type: String }], 
    performanceBonus: { type: Number, default: 0 }, 
    promotions: [{ 
      title: { type: String }, 
      date: { type: Date } 
    }]
  }, { timestamps: true });
  
  export default mongoose.model('Rewards', RewardsSchema);