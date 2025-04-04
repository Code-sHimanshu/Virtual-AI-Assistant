import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to the Virtual AI Assistant</h1>
      <p>Your AI-powered assistant for lung cancer detection and health guidance.</p>
      <Button as={Link} to="/predict" variant="primary" className="m-2">Get a Prediction</Button>
      <Button as={Link} to="/chat" variant="success" className="m-2">Ask AI Assistant</Button>
    </Container>
  );
};

export default Home;
