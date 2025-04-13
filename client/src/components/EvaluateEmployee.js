import React, {useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {Container, Row, Col, Card, Form,Button  } from "react-bootstrap"
import "./EvaluateEmployee.css"


const EvaluateEmployee = () => {

    const { employeeID } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData]=useState({
        taskCompletion:"",
        workAccuracy:"",
        productivity:"",
        achievementOfGoals:"",
        coreJobSkills:"",
        deadlineCompliance:"",
        comments:"",
        evaluationDate: new Date().toISOString().split("T")[0]
    })

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: name === "comments" || name === "evaluationDate" ? value : parseInt(value) || ""
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const { evaluationDate } = formData;
            const [year, month] = evaluationDate.split("-");
            console.log(`📡 Making GET request to: http://localhost:5000/api/tlevaluations/check?employee_id=${employeeID}&month=${parseInt(month)}&year=${parseInt(year)}`);
            
            const response = await axios.get(`http://localhost:5000/api/tlevaluations/check`, {
                params: { employee_id: employeeID, month: parseInt(month), year: parseInt(year) }
            });
            console.log("Check response:", response.data);
           
            
            if (response.data.exists) {
                alert("Evaluation for this employee in this month already exists!");
                return;
                
            }

            console.log("Submitting evaluation...");

            await axios.post("http://localhost:5000/api/tlevaluations", {
                employee_id: employeeID,
                month: parseInt(month),
                year: parseInt(year),
                ...formData
            });

            alert("Evaluation submitted successfully!")
            navigate(`/employee/performance/${employeeID}`)

        }catch (error) {
            console.error("❌ Error submitting evaluation:", error);
            alert(error.response?.data?.message || "Error submitting evaluation. Please try again.");
        }
    }
  return (
    <Container className="my-5 d-flex">
            <Row className=" d-flex justify-content-center w-100">
                <Col lg={8} md={10} sm={12} xs={12} className='my-4'>
                    <Card className="shadow p-4">
                        <h2 className="text-center mb-4">Evaluate Employee</h2>
                        <Form onSubmit={handleSubmit} >
                            {[
                                "taskCompletion",
                                "workAccuracy",
                                "productivity",
                                "achievementOfGoals",
                                "coreJobSkills",
                                "deadlineCompliance"
                            ].map((field, index) => (
                                <Form.Group className="mb-3" key={index} >
                                    <Form.Label>
                                        {field.replace(/([A-Z])/g, ' $1').trim()}:
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        min="0"
                                        max="10"
                                        required
                                        className='w-100'
                                    />
                                </Form.Group>
                            ))}

                            <Form.Group className="mb-3">
                                <Form.Label>Evaluation Date:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="evaluationDate"
                                    value={formData.evaluationDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Comments:</Form.Label>
                                <Form.Control as="textarea" name="comments" value={formData.comments} onChange={handleChange} required />
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary w-100">Submit Evaluation</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}

export default EvaluateEmployee