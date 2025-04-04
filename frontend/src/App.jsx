import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent.jsx";
import Home from "./pages/home.jsx";
import Predict from "./pages/predict.jsx";
import Chat from "./pages/chat.jsx";
import Explanation from "./pages/explaination.jsx";
import Recommendation from "./pages/recommendation.jsx";

import { Container } from "react-bootstrap";

<Container className="p-5 my-5 bg-light rounded">
  <h1>Welcome!</h1>
  <p>This is a simple hero unit.</p>
</Container>;


const App = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/explanation" element={<Explanation />} />
        <Route path="/recommendation" element={<Recommendation />} />
      </Routes>
    </>
  );
};

const sendMessage = async () => {
  if (!userMessage.trim()) return; // Avoid sending empty messages

  try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json(); // Parse JSON response
      console.log("Bot reply:", data.response || data.error);

      setChatMessages([...chatMessages, { type: "user", text: userMessage }]);

      if (data.response) {
          setChatMessages([...chatMessages, { type: "bot", text: data.response }]);
      } else {
          setChatMessages([...chatMessages, { type: "bot", text: "Error: No response from bot" }]);
      }
  } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages([...chatMessages, { type: "bot", text: "Error: Failed to connect" }]);
  }

  setUserMessage(""); // Clear input field
};


export default App;
