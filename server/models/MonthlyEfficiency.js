import mongoose from "mongoose";

const MonthlyEfficiencySchema = new mongoose.Schema({
    month: { type: String, required: true },
    efficiency: { type: Number, required: true }
});

export default mongoose.model("MonthlyEfficiency", MonthlyEfficiencySchema);    