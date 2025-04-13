import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./EvaluateEmployee.css";

const HrEvaluate = () => {
    const { employeeID } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        leaveCount: "",
        unplannedLeaveCount: "",
        leaveReasonComments: "",
        policyComplianceIncident: "",
        punctuality: "",
        attendanceRegularity: "",
        discipline: "",
        teamCollaboration: "",
        initiative: "",
        comments: "",
        evaluationDate: new Date().toISOString().split("T")[0]
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: (name === "comments" || name === "leaveReasonComments" || name === "evaluationDate")
                ? value
                : value === "" ? "" : parseInt(value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { evaluationDate, ...restFormData } = formData;
            const [year, month] = evaluationDate.split("-");
            
            // Check if evaluation already exists
            const response = await axios.get(`http://localhost:5000/api/hrevaluations/check/exist`, {
                params: { 
                    employee_id: employeeID, 
                    month: parseInt(month), 
                    year: parseInt(year) 
                }
            });
    
            if (response.data.exists) {
                alert("Evaluation for this employee in this month already exists!");
                setLoading(false);
                return;
            }
    
            // Submit evaluation
            await axios.post("http://localhost:5000/api/hrevaluations/add", {
                employee_id: employeeID,
                month: parseInt(month),
                year: parseInt(year),
                ...restFormData
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
    
            alert("Evaluation submitted successfully!");
            navigate(`/employee/performance/${employeeID}`);
        } catch (error) {
            console.error("❌ Error submitting evaluation:", error);
            alert(error.response?.data?.message || "Error submitting evaluation. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Container className="my-5 d-flex">
            <Row className="d-flex justify-content-center w-100">
                <Col lg={8} md={10} sm={12} xs={12} className='my-4'>
                    <Card className="shadow p-4">
                        <h2 className="text-center mb-4">Evaluate Employee</h2>
                        <Form onSubmit={handleSubmit}>

                            {[
                                { name: "leaveCount", label: "Leave Count" },
                                { name: "unplannedLeaveCount", label: "Unplanned Leave Count" },
                                { name: "policyComplianceIncident", label: "Policy Compliance Incidents" },
                                { name: "punctuality", label: "Punctuality (0-10)" },
                                { name: "attendanceRegularity", label: "Attendance Regularity (0-10)" },
                                { name: "discipline", label: "Discipline (0-10)" },
                                { name: "teamCollaboration", label: "Team Collaboration (0-10)" },
                                { name: "initiative", label: "Initiative (0-10)" }
                            ].map((field, index) => (
                                <Form.Group className="mb-3" key={index}>
                                    <Form.Label>{field.label}:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        min="0"
                                        max="10"
                                        required
                                    />
                                </Form.Group>
                            ))}

                            <Form.Group className="mb-3">
                                <Form.Label>Leave Reason Comments:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="leaveReasonComments"
                                    value={formData.leaveReasonComments}
                                    onChange={handleChange}
                                    placeholder="Reason for leaves (if any)"
                                />
                            </Form.Group>

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
                                <Form.Label>Additional Comments:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="Any additional comments"
                                />
                            </Form.Group>

                            <Button type="submit" className="btn btn-primary w-100">Submit Evaluation</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HrEvaluate;
