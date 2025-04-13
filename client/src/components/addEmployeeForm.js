import React, { useState } from 'react';
import axios from 'axios';
import "./employeeForm.css"

const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        employeeID: '',
        name: '',
        designation: '',
        department: '',
        dateOfJoining: '',
        workLocation: 'Onsite',
        employmentType: 'Full-time'
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            alert('Employee added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        }
    };

    return (
        <div className="container mt-4">
            
            <form onSubmit={handleSubmit}>
            <h2 className='mb-4 text-center'>Add Employee</h2>
                <div className="mb-3">
                    <label className="form-label">Employee ID:</label>
                    <input type="text" className="form-control" name="employeeID" value={formData.employeeID} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Designation:</label>
                    <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} required />
                </div>
               
                <div className="mb-3">
                    <label className="form-label">Date of Joining:</label>
                    <input type="date" className="form-control" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Location:</label>
                    <select className="form-control" name="workLocation" value={formData.workLocation} onChange={handleChange}>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Employment Type:</label>
                    <select className="form-control" name="employmentType" value={formData.employmentType} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary my-4">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;
