import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeID: { type: String, required: true, unique: true },
  role:{type:String, required: true},
  
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
