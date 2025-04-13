import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Col, Row, Form, Button, Alert } from "react-bootstrap";
import "./Login.css"; // Using the same CSS as Login
const ResetPassword = () => {
    const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/reset-password", {
        username,
        newPassword,
      } );
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed!");
      
    }
  };


  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 d-flex align-items-center justify-content-center">
        <Col md={6} sm={10} xs={12} className="text-center">
          <Card className="w-100 loginCard d-flex align-items-center p-4">
            <h2 className="my-3">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleReset} className="w-100">
              <div className='formWrapper'>
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="newPassword" className="mt-3">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="mt-3 w-100" variant="primary">
                Reset Password
              </Button>
              </div>
            </Form>

            <Button className="mt-3 w-100" variant="secondary" onClick={() => navigate("/")}>
              Back to Login
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword