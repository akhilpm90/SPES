import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const EditTlEvaluation = () => {
  const { id } = useParams();
  const [tlEvaluations, setTlEvaluations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    if (!id) {
      console.warn("⚠️ No ID found in URL, skipping fetch");
      return;
    }

    const fetchEvaluations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tlevaluations/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched TL Evaluations:", data);

        if (Array.isArray(data)) {
          setTlEvaluations(data);
        } else {
          console.warn("⚠️ Received invalid TL evaluation data.");
          setTlEvaluations([]);
        }
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
      taskCompletion: parseInt(selectedEvaluation.taskCompletion) || 0,
      workAccuracy: parseInt(selectedEvaluation.workAccuracy) || 0,
      productivity: parseInt(selectedEvaluation.productivity) || 0,
      achievementOfGoals: parseInt(selectedEvaluation.achievementOfGoals) || 0, // You missed this field in the modal too
      coreJobSkills: parseInt(selectedEvaluation.coreJobSkills) || 0,
      deadlineCompliance: parseInt(selectedEvaluation.deadlineCompliance) || 0,
      month: parseInt(selectedEvaluation.month) || 1,
      year: parseInt(selectedEvaluation.year) || new Date().getFullYear(),
    };
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/tlevaluations/${selectedEvaluation._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      // Update state
      setTlEvaluations((prev) =>
        prev.map((evalItem) =>
          evalItem._id === selectedEvaluation._id ? updatedData : evalItem
        )
      );
  
      setShowModal(false);
    } catch (error) {
      console.error("Error updating evaluation:", error);
      alert("Failed to update. See console for details.");
    }
  };

  return (
<>
<Container className="py-3">
<h2 className="text-center mb-4 ">Edit TL Evaluation</h2>
</Container>
<Container className="py-1">
        

        {tlEvaluations.length > 0 ? (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Period</th>
                <th>ID</th>
                <th>Task Completion</th>
                <th>Work Accuracy</th>
                <th>Productivity</th>
                <th>Goal Achievement</th>
                <th>Skills</th>
                <th>Deadline Compliance</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tlEvaluations.map((evaluation) => (
                <tr key={evaluation._id} className="align-middle">
                  <td>{evaluation.month}/{evaluation.year}</td>
                  <td>{evaluation.employee_id}</td>
                  <td>{evaluation.taskCompletion}</td>
                  <td>{evaluation.workAccuracy}</td>
                  <td>{evaluation.productivity}</td>
                  <td>{evaluation.achievementOfGoals}</td>
                  <td>{evaluation.coreJobSkills}</td>
                  <td>{evaluation.deadlineCompliance}</td>
                  <td>{evaluation.comments}</td>
                  <td className="text-center">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(evaluation)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted text-center">No evaluations found.</p>
        )}
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Edit Evaluation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvaluation && (
            <Form>
              {[
                ["Task Completion", "taskCompletion"],
                ["Work Accuracy", "workAccuracy"],
                ["Productivity", "productivity"],
                ["Goal Achievement", "achievementOfGoals"],
                ["Core Job Skills", "coreJobSkills"],
                ["Deadline Compliance", "deadlineCompliance"],
                ["Month", "month"],
                ["Year", "year"],
              ].map(([label, field], index) => (
                <Form.Group className="mb-3" key={index}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedEvaluation[field]}
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
                  value={selectedEvaluation.comments}
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

export default EditTlEvaluation;
