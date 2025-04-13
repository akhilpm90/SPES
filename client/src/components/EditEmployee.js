import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const EditEmployee = () => {
  const { id } = useParams(); // Employee _id
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/employees/${id}`)
      .then((res) => res.json())
      
      .then((data) => {setEmployee(data); console.log("Fetched employee",data);})
      
      .catch(() => setError("Failed to load employee data"));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => {
        setSuccess("Employee updated successfully!");
        alert("Employee updated successfully!");
        setTimeout(() => navigate("/employees"), 1000);
      })
      .catch(() => setError("Failed to update employee."));
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <>
    <Container>
    <h2>Edit Employee</h2>
    </Container>
    <Container className="py-4">
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="text" name="employeeID" value={employee.employeeID} onChange={handleChange} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={employee.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" name="designation" value={employee.designation} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" name="department" value={employee.department} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Work Location</Form.Label>
          <Form.Select name="workLocation" value={employee.workLocation} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Employment Type</Form.Label>
          <Form.Select name="employmentType" value={employee.employmentType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Update</Button>
      </Form>
    </Container>
    </>
  );
};

export default EditEmployee;
