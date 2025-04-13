import mongoose from 'mongoose'

const EmployeeSchema= new mongoose.Schema({
    employeeID:{type: String, required: true, unique:true},
    name: {type: String, required: true},
    
    designation:{type: String, required: true},
    department: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    workLocation: { type: String, enum: ['Onsite', 'Remote', 'Hybrid'], required: true },
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
})

export default mongoose.model('Employee', EmployeeSchema);