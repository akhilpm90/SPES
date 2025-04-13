import express from "express";
import { 
    getAllEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee ,
    getEmployeePerformance
} from '../controllers/employeeController.js'

const router = express.Router();

router.get("/", getAllEmployees);        // Fetch all employees
router.get("/:id", getEmployeeById);     // Fetch a single employee by ID
router.post("/", createEmployee);        // Create a new employee
router.put("/:id", updateEmployee);      // Update an existing employee
router.delete("/:id", deleteEmployee);   // Delete an employee
router.get('/performance/:employeeID', getEmployeePerformance);

export default router;