

import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from "chart.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import './EmployeePerformance.css';
import { Container, Card, Table, Row, Col } from "react-bootstrap";

ChartJS.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const EmployeePerformance = () => {
  const { employeeID } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [tlEvaluations, setTlEvaluation] = useState([]);
  const [hrEvaluations, setHrEvaluation] = useState([]);
  const [managerEvaluations, setManagerEvaluation] = useState([]);
  const [role, setRole] = useState("");
  const [averageScores, setAverageScores] = useState([]);

  

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const fetchData = async () => {
      try {
        const [employeesRes, tlEvalRes, hrEvalRes, managerEvalRes] = await Promise.all([
          fetch("http://localhost:5000/api/employees").then(res => res.json()),
          fetch(`http://localhost:5000/api/tlevaluations/${employeeID}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/hrevaluations/${employeeID}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/managerevaluations/${employeeID}`).then(res => res.json())
        ]);

        console.log("Employees Response:", employeesRes);
    console.log("TL Evaluations Response:", tlEvalRes);
    console.log("HR Evaluations Response:", hrEvalRes);
    console.log("Manager Evaluations Response:", managerEvalRes);

    if (!Array.isArray(employeesRes) || employeesRes.length === 0) {
      console.error("❌ Employees data is empty or invalid.");
    }
    if (!Array.isArray(tlEvalRes) || tlEvalRes.length === 0) {
      console.warn("⚠️ Team Leader evaluations are empty.");
    }
    if (!Array.isArray(hrEvalRes) || hrEvalRes.length === 0) {
      console.warn("⚠️ HR evaluations are empty.");
    }
    if (!Array.isArray(managerEvalRes) || managerEvalRes.length === 0) {
      console.warn("⚠️ Manager evaluations are empty.");
    }


        setEmployee(employeesRes.find(emp => emp.employeeID === employeeID) || null);
        setTlEvaluation(Array.isArray(tlEvalRes) ? tlEvalRes : []);
        setHrEvaluation(Array.isArray(hrEvalRes) ? hrEvalRes : []);
        setManagerEvaluation(Array.isArray(managerEvalRes) ? managerEvalRes : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employeeID]);

  useEffect(() => {
    const fetchAverageScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/average-evaluations/average-scores");
        const data = await response.json();
        console.log("Fetched average scores:", data);
        if (!Array.isArray(data) || data.length === 0) {
          console.error("Error: Received empty or invalid data for average scores.");
        } else {
          console.log("✅ Valid data received:", data);
        }
        setAverageScores(data);
      } catch (error) {
        console.error("Error fetching average scores:", error);
      }
    };
  
    fetchAverageScores();
  }, []);

  if (!employee) {
    return <p>Loading employee data...</p>;
  }

  const extractMetricData = (evaluations, metric) =>
    Array.isArray(evaluations) ? evaluations.map(record => record[metric] || 0) : [];

  const getChartLabels = (evaluations) =>
    evaluations.length
      ? evaluations
          .sort((a, b) => new Date(a.evaluationDate) - new Date(b.evaluationDate))
          .map(record => record.month && record.year ? `${record.month}/${record.year}` : "Unknown Date")
      : [];

  const tlChartMetrics = [
    { label: "Task Completion", color: "#007bff", dataKey: "taskCompletion" },
    { label: "Work Accuracy", color: "#28a745", dataKey: "workAccuracy" },
    { label: "Productivity", color: "#ffc107", dataKey: "productivity" },
    { label: "Achievement of Goals", color: "#dc3545", dataKey: "achievementOfGoals" },
    { label: "Core Job Skills", color: "#17a2b8", dataKey: "coreJobSkills" },
    { label: "Deadline Compliance", color: "#6c757d", dataKey: "deadlineCompliance" },
  ];

  const hrChartMetrics = [
    { label: "Leave Count", color: "#f54291", dataKey: "leaveCount" },
    { label: "Unplanned Leave", color: "#42f58d", dataKey: "unplannedLeaveCount" },
    { label: "Policy Compliance Incidents", color: "#f5a142", dataKey: "policyComplianceIncident" },
    { label: "Punctuality", color: "#4287f5", dataKey: "punctuality" },
    { label: "Attendance Regularity", color: "#7b42f5", dataKey: "attendanceRegularity" },
    { label: "Discipline", color: "#f54242", dataKey: "discipline" },
    { label: "Team Collaboration", color: "#42d4f5", dataKey: "teamCollaboration" },
    
    { label: "Initiative", color: "#9cf542", dataKey: "initiative" },
  ];

  const managerChartMetrics = [
    { label: "Contribution", color: "#8B0000", dataKey: "contribution" },
    { label: "Initiative & Proactiveness", color: "#FF4500", dataKey: "initiative_and_proactiveness" },
    { label: "Adaptability & Flexibility", color: "#1E90FF", dataKey: "adaptability_and_flexibility" },
    { label: "Communication & Presentation", color: "#32CD32", dataKey: "communication_and_presentation" },
    { label: "Problem Solving & Decision Making", color: "#FFD700", dataKey: "problem_solving_and_decision_making" },
    { label: "Potential for Advancement", color: "#8A2BE2", dataKey: "potential_for_advancement" },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: 
    {
              x: 
              { // Explicitly define the x-axis
                type: "category",
                title: {
                  display: true,
                  text: "Month-Year",
                },
              },
      y: 
      { 
        beginAtZero: true ,
        suggestedMax: 10,
        title: 
          {
            display: true,
            text: "Rating",
          },
        ticks: 
        {
        stepSize: 1, // Optional: Ensures each step is 1 unit
        },
    
      } 
    }
     
  };

  

  // Extract Labels (Month-Year) and Data (Average Total)
const chartLabels = averageScores.map(item => `${item.month}/${item.year}`);
const chartData = averageScores.map(item => item.avg_total);

// Chart Data Configuration

const avgScoreChartData = {
  labels: chartLabels,
  datasets: [
    {
      label: "Average Performance Score",
      data: chartData,
      borderColor: "#ff6384",
      backgroundColor: "#ff638433",
      borderWidth: 2,
    },
  ],
};

  return (
    <>
      <Container className="mt-4">
        <h5 className="mb-4">Performance Details for {employee.name}</h5>
      </Container>

      <Container className="py-4">
        <Row className="mb-4 w-100">
          <Col md={8} className="bg-light">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{employee.employeeID}</td>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={4} className="evalCol">
            <div
              className="evalBtn"
              onClick={() => {
                if (role === "HR Manager") {
                  navigate(`/hr-evaluate-employee/${employeeID}`);
                } else if (role === "Team Leader") {
                  navigate(`/evaluate-employee/${employeeID}`);
                }else if (role === "Manager") {
                  navigate(`/manager-evaluate-employee/${employeeID}`);
                }
              }}
            >
              <strong>Evaluate Employee</strong>
            </div>
            {/* <div className="evalBtn" onClick={()=>{
              if(role==="Team Leader"){
                navigate(`/edit-tl-evaluation/${employeeID}`)
                  }
                  else if(role==="HR Manager"){
                    navigate(`/edit-hr-evaluation/${employeeID}`)
                  }
            }}>
              <strong>Edit Evaluation</strong>
            </div> */}
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mb-4 w-100">
          <Col md={12} lg={12} className="mb-4 ">
            <Card>
              <Card.Body>
                <h5>Overall Average Performance Over Time</h5>
                <Line data={avgScoreChartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mb-4">
          {role === "HR Manager" &&
            hrChartMetrics.map(({ label, color, dataKey }, index) => (
              <Col md={6} lg={6} xs={12} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <h5>{label} Over Time</h5>
                    <Line
                      data={{
                        labels: getChartLabels(hrEvaluations),
                        datasets: [
                          {
                            label,
                            data: extractMetricData(hrEvaluations, dataKey),
                            borderColor: color,
                            backgroundColor: `${color}33`,
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}

          {role === "Team Leader" &&
            tlChartMetrics.map(({ label, color, dataKey }, index) => (
              <Col md={6} lg={6} xs={12} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <h5>{label} Over Time</h5>
                    <Line
                      data={{
                        labels: getChartLabels(tlEvaluations),
                        datasets: [
                          {
                            label,
                            data: extractMetricData(tlEvaluations, dataKey),
                            borderColor: color,
                            backgroundColor: `${color}33`,
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}

          {role === "Manager" &&
            managerChartMetrics.map(({ label, color, dataKey }, index) => (
              <Col md={6} lg={6} xs={12} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <h5>{label} Over Time</h5>
                    <Line
                      data={{
                        labels: getChartLabels(managerEvaluations),
                        datasets: [
                          {
                            label,
                            data: extractMetricData(managerEvaluations, dataKey),
                            borderColor: color,
                            backgroundColor: `${color}33`,
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default EmployeePerformance;
