import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";

const Explanation = () => {
  const [prediction, setPrediction] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExplain = async () => {
    if (!prediction) return;
    try {
      const res = await axios.post("http://localhost:5000/explain", { prediction });
      setExplanation(res.data.explanation);
    } catch (error) {
      console.error("Error fetching explanation:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h4>Get Explanation</h4>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter prediction result..."
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" variant="info" onClick={handleExplain}>
            Explain
          </Button>
        </Form>
        {explanation && (
          <Card className="mt-3 p-3">
            <strong>Explanation:</strong> {explanation}
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default Explanation;
