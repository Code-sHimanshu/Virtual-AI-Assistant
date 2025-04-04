import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";

const Recommendation = () => {
  const [prediction, setPrediction] = useState("");
  const [specialists, setSpecialists] = useState([]);

  const handleRecommend = async () => {
    if (!prediction) return;
    try {
      const res = await axios.post("http://localhost:5000/recommend", { prediction });
      setSpecialists(res.data.specialists);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h4>Find a Specialist</h4>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter prediction result..."
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" variant="warning" onClick={handleRecommend}>
            Recommend
          </Button>
        </Form>
        {specialists.length > 0 && (
          <Card className="mt-3 p-3">
            <strong>Specialists:</strong>
            <ul>
              {specialists.map((specialist, index) => (
                <li key={index}>{specialist}</li>
              ))}
            </ul>
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default Recommendation;
