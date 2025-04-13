import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config(); 
import jwt from "jsonwebtoken";


export const registerAdmin = async (req, res) => {
  try {
    const { name, employeeID, role, department, email, username, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already registered!" });

    // Create new admin without password hashing
    const newAdmin = new Admin({
      name,
      employeeID,
      department,
      role,
      email,
      username,
      password
    });

    await newAdmin.save();
    console.log("Admin Registered Successfully:", newAdmin);  
    res.status(201).json({ message: "Admin registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};


export const resetPassword=async (req, res)=>{
  try{
    const {username, newPassword}=req.body
    console.log("Reset password request received for:", username);
    const admin= await Admin.findOne({username})

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }
    console.log("Admin found:", admin);
    // const hashedPassword= await bcrypt.hash(newPassword, 10)
    // console.log("New hashed password:", hashedPassword);
    // admin.password=hashedPassword
    admin.password = newPassword
    await admin.save();

    res.json({message:"password reset successfully"})
  } catch(error){
    res.status(500).json({message: "Error resetting password", error:error.message})
  }
}

export const loginAdmin= async (req, res)=>{
  try{
    const {username, password}=req.body;
    console.log("login request received for ", username)

    const admin=await Admin.findOne({username})
    if(!admin)
    {
      return res.status(404).json({message:"Admin not found!"})
    }

    // const isMatch= await bcrypt.compare(password, admin.password)
    // if (!isMatch)
    // {
    //   return res.status(401).json({message :  "invalid credentials!"})
    // }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    
    const token = jwt.sign({ userid: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({message: "login successful",token, role:admin.role})
  }
  catch(error){
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}