import React  from 'react'
// import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap"
import TeamEfficiency from './TeamEfficiency';
import MonthlyEfficiency from './MonthlyEfficiency'

import "./Admin.css"



const Admin = () => {
    const navigate=useNavigate()
    const role = localStorage.getItem("userRole");
  return (
   //Employee card
   <>
   
        <Container className='my-4' >
            <Row style={{ width:'100%'}}>
              <Col md={4} sm={12}  onClick={()=>navigate('/employees')} className='mt-4'>
                     <div className='tile d-flex justify-content-center align-items-center'> 
                          <h5>Staff Details</h5> 
                     </div>
              </Col>

              
              {
                role==="Manager" &&  (
                     <Col md={4} sm={12} className='mt-4' onClick={()=>navigate('/employeeRegistration')}>
                     <div className='tile tile d-flex justify-content-center align-items-center'>
                            <h5>TL/HR Registration</h5>
                     </div>
              </Col>
                     
                )   
              }
              {role==="HR Manager"&&(<Col md={4} sm={12} className='mt-4' onClick={()=>navigate('/employee/add')}>
                            <div className='tile tile d-flex justify-content-center align-items-center'> 
                                   <h5>Add Employee</h5>
                            </div>
                     </Col>)}
                     
            </Row>
        </Container>
   
   <section>
    <Container>
       <Row style={{ width:'100%'}}>
              <TeamEfficiency/>
              <MonthlyEfficiency/>
       </Row>
    </Container>
    
   </section>
   

   </>
  )
}

export default Admin