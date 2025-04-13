import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js'
import teamProductivityRoutes from './routes/teamProductivityRoutes.js'
import tlEvaluationRoutes from './routes/tlEvaluationRoutes.js'
import { resetPassword } from "./controllers/adminController.js";
import hrEvaluationRoutes from "./routes/hrEvaluationRoutes.js"
import managerEvaluationRoutes from "./routes/managerEvaluationRoutes.js"
import averageEvaluationRoutes from "./routes/averageEvaluationRoutes.js";


dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to DB: ${process.env.MONGO_URI}`))
    .catch(err => console.error("DB Connection Error:", err));

    
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/teamproductivity", teamProductivityRoutes);
app.use("/api/tlevaluations", tlEvaluationRoutes);
app.use("/api/hrevaluations", hrEvaluationRoutes);
app.use("/api/managerEvaluations", managerEvaluationRoutes);
app.use("/api/average-evaluations", averageEvaluationRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


