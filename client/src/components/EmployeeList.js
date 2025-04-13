
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { Container, Table, Alert, Row, Col, Button, Modal } from 'react-bootstrap';
import './EmployeeList.css';

const Employeelist = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:5000/api/employees')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setError("Failed to load employee data. Please try again.");
      });
  };

  const handleRowClick = (employeeID) => {
    
    navigate(`/employee/performance/${employeeID}`);
  };

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`);
    
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedEmployee) return;

    fetch(`http://localhost:5000/api/employees/${selectedEmployee._id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete employee. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSuccess(`Deleted employee ${selectedEmployee.name} successfully.`);
        setShowConfirm(false);
        setSelectedEmployee(null);
        fetchEmployees(); // refresh list
      })
      .catch((error) => {
        console.error('Delete failed:', error);
        setError("Failed to delete employee. Please try again.");
      });
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center w-100">
        <Col lg={12}> 
          <h2 className="text-center mb-4">Employee Details</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

          {employees.length > 0 ? (
            <Table striped bordered hover responsive className="mt-4">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Work Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td onClick={() => handleRowClick(emp.employeeID)} style={{ cursor: "pointer" }}>{emp.employeeID || "N/A"}</td>
                    <td onClick={() => handleRowClick(emp.employeeID)} style={{ cursor: "pointer" }}>{emp.name || "N/A"}</td>
                    <td>{emp.designation || "N/A"}</td>
                    <td>{emp.department || "N/A"}</td>
                    <td>{emp.workLocation || "N/A"}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(emp._id)} className="me-2">Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteClick(emp)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !error && <p className="text-center">Loading employees...</p>
          )}
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Employeelist;
