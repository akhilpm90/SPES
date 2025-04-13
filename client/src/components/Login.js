import React, {useState} from 'react';
import axios from 'axios';
import {Container, Card, Col, Row, Form, Button, Alert} from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
          const res = await axios.post("http://localhost:5000/admin/login", { username, password });
          console.log("Login response:", res.data);
          if (res.data.role) {
            localStorage.setItem("userRole", res.data.role);
          } else {
            console.error("Role is missing in response!");
          }
     
          localStorage.setItem("token", res.data.token); 
        
          navigate("/admin"); 

        }catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <Row className='w-100 d-flex align-items-center justify-content-center'>
        <Col lg={6} className='text-center'>
          <Card className=' loginCard d-flex align-items-center'>
            <h2 className='my-4'>Admin Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              
             <div className='formWrapper'>
             <Form.Group controlId='username' className='text-center'>
                <Form.Label>
                  <h6>Username:</h6>
                </Form.Label>
                
                  <Form.Control
                    type='text'
                    placeholder='Enter username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                  />
                
              </Form.Group>

              <Form.Group controlId='password' className='mt-2 text-center'>
                <Form.Label><h6>Password:</h6></Form.Label>
                
                  <Form.Control
                    type='password'
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    >
                  </Form.Control>
                
              </Form.Group>
                 <Button type="submit" className="mt-3" variant="primary">
                    Login
                 </Button>
             </div>
              
            </Form>
            
            {/* Reset Password Option */}
            <p className='my-4'>
              Forgot your password? <Link to="/reset-password">Reset Password</Link>
            </p>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};



export default Login
