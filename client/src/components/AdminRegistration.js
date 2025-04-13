import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeID: "",
    role:"",
    department: "Software Development",
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({ name: "", employeeID: "", role:"", department: "Software Development", email: "", username: "", password: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering admin:", error);
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100 " style={{margin: "80px 0"}}>
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "50%"}}>
        <h2 className="text-center">Register Team Leader / HR Manager</h2>
        <form onSubmit={handleSubmit} className="w-100">
          
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Employee ID:</label>
            <input type="text" className="form-control" name="employeeID" value={formData.employeeID} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Team Leader">Team Leader</option>
              <option value="HR Manager">HR Manager</option>
            </select>
          </div>
          
          
          
          <div className="mb-3">
            <label className="form-label">Department:</label>
            <select className="form-select" name="department" value={formData.department} onChange={handleChange}>
              <option value="Software Development">Software Development</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Management">Management</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </main>
  );
};

export default AdminRegisterForm;
