import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";

const PredictionForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setResult(res.data.result);
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h4>Upload Lung Scan</h4>
        <Form>
          <Form.Group>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          <Button className="mt-2" variant="success" onClick={handleSubmit}>
            Predict
          </Button>
        </Form>
        {result && (
          <Card className="mt-3 p-3">
            <strong>Prediction Result:</strong> {result}
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default PredictionForm;
