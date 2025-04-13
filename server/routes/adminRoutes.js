import express from 'express';
import { registerAdmin, resetPassword, loginAdmin } from '../controllers/adminController.js';


const router = express.Router();

router.post("/register", registerAdmin);
router.post("/reset-password", resetPassword);
router.post("/login", loginAdmin);
export default router;