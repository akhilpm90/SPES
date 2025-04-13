import Employee from "../models/employeemodel/Employee.js"; 
import Performance from '../models/employeeModel/Performance.js'

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error });
    }
};

// Create new employee
export const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", error });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error });
    }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error });
    }
};

export const getEmployeePerformance = async (req, res) => {
    try {
        
        const employeeID = req.params.employeeID.trim(); // Ensure no extra spaces
       

        const employee = await Performance.findOne({ employeeID: employeeID });

       

        if (!employee) {
            return res.status(404).json({ message: "Employee performance not found" });
        }

        res.status(200).json(employee);

    } catch (error) {
        console.error("Error fetching performance data:", error.message);
        res.status(500).json({ message: "Error fetching performance data", error: error.message });
    }
};
