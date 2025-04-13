import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const EditHrEvaluation = () => {
  const { id } = useParams();
  const [hrEvaluations, setHrEvaluations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvaluations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hrevaluations/${id}`);
        const data = await response.json();
        setHrEvaluations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching evaluations:", error);
      }
    };

    fetchEvaluations();
  }, [id]);

  const handleEdit = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedEvaluation) return;

    const updatedData = {
      ...selectedEvaluation,
      month: parseInt(selectedEvaluation.month) || 0,
      year: parseInt(selectedEvaluation.year) || 0,
      leaveCount: parseInt(selectedEvaluation.leaveCount) || 0,
      unplannedLeaveCount: parseInt(selectedEvaluation.unplannedLeaveCount) || 0,
      policyComplianceIncident: parseInt(selectedEvaluation.policyComplianceIncident) || 0,
      punctuality: parseInt(selectedEvaluation.punctuality) || 0,
      attendanceRegularity: parseInt(selectedEvaluation.attendanceRegularity) || 0,
      discipline: parseInt(selectedEvaluation.discipline) || 0,
      teamCollaboration: parseInt(selectedEvaluation.teamCollaboration) || 0,
      initiative: parseInt(selectedEvaluation.initiative) || 0,
      comments: selectedEvaluation.comments || ""
    };

    updatedData.averageScore =
    (updatedData.punctuality +
      updatedData.attendanceRegularity +
      updatedData.discipline +
      updatedData.teamCollaboration +
      updatedData.initiative) / 5;


    try {
      const response = await fetch(`http://localhost:5000/api/hrevaluations/${selectedEvaluation._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      setHrEvaluations((prev) =>
        prev.map((evalItem) => (evalItem._id === selectedEvaluation._id ? { ...updatedData, _id: selectedEvaluation._id }
           : evalItem))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating HR evaluation:", error.response?.data || error.message);
      alert("Failed to update HR evaluation.");
      
    }
  };

  return (
    <>
      <Container className="py-3">
        <h2 className="text-center mb-4">Edit HR Evaluation</h2>
      </Container>

      <Container className="py-1">
        {hrEvaluations.length > 0 ? (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Period</th>
                <th>ID</th>
                
                <th>Leave</th>
                <th>Unplanned</th>
                <th>Compliance</th>
                <th>Punctuality</th>
                <th>Attendance</th>
                <th>Discipline</th>
                <th>Collab</th>
                <th>Initiative</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hrEvaluations.map((evaluation) => (
                <tr key={evaluation._id}>
                  <td>{evaluation.month}/{evaluation.year}</td>
                  <td>{evaluation.employee_id}</td>
                  <td>{evaluation.leaveCount}</td>
                  <td>{evaluation.unplannedLeaveCount}</td>
                  <td>{evaluation.policyComplianceIncident}</td>
                  <td>{evaluation.punctuality}</td>
                  <td>{evaluation.attendanceRegularity}</td>
                  <td>{evaluation.discipline}</td>
                  <td>{evaluation.teamCollaboration}</td>
                  <td>{evaluation.initiative}</td>
                  <td>{evaluation.comments}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(evaluation)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted text-center">No HR evaluations found.</p>
        )}
      </Container>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit HR Evaluation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvaluation && (
            <Form>
              {[
                ["Month", "month"],
                ["Year", "year"],
                ["Leave Count", "leaveCount"],
                ["Unplanned Leave Count", "unplannedLeaveCount"],
                ["Policy Compliance Incident", "policyComplianceIncident"],
                ["Punctuality", "punctuality"],
                ["Attendance Regularity", "attendanceRegularity"],
                ["Discipline", "discipline"],
                ["Team Collaboration", "teamCollaboration"],
                ["Initiative", "initiative"],
              ].map(([label, field]) => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedEvaluation[field] || 0}
                    onChange={(e) =>
                      setSelectedEvaluation({
                        ...selectedEvaluation,
                        [field]: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedEvaluation.comments || ""}
                  onChange={(e) =>
                    setSelectedEvaluation({
                      ...selectedEvaluation,
                      comments: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditHrEvaluation;
