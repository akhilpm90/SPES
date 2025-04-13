import React, {useState, useEffect} from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import logo from "../images/logo.png"; 

const Header = () => {
  const navigate= useNavigate();
  const token=localStorage.getItem("token");
  const [role, setRole] = useState("");

  useEffect(()=>{
    
    const storedRole = localStorage.getItem("userRole");
      console.log("Fetched role from localStorage:", storedRole);
      if (storedRole) {
          setRole(storedRole);
          
      }
  
  },[])
  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }


  return (

    <Navbar expand="lg" bg="dark" variant="dark" className="shadow py-3">
    <Container>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            height="45"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          {token && (
            <>
              <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
             {role==="Manager" &&(<Nav.Link as={Link} to="/employeeRegistration" style={{ whiteSpace: "nowrap" }}>Register Employee</Nav.Link>)}
              
              {role && (
                <Nav.Item>
                <Navbar.Text className="ms-3 text-light fw-bold">
                 <Badge>{role}</Badge> 
                </Navbar.Text>
              </Nav.Item>
              )}
            </>
          )}

          {token && (
            <Nav.Item>
            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <Button>Logout</Button>
            </Nav.Link>
          </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;
