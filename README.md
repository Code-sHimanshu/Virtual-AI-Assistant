Virtual AI Assistant for Lung Cancer Detection System


🚀 Introduction
Welcome to the Virtual AI Assistant for Lung Cancer Detection! This powerful, interactive platform combines machine learning, modern frontend UI, and intelligent voice interactivity to help users interactively detect and understand lung cancer outcomes. It offers both text and voice-based support, giving users flexibility and accessibility.


🛠️ Technologies Used
- React (with Bootstrap) for frontend
- Flask (Python) for backend API
- Hugging Face Transformers for AI chatbot
- TensorFlow/Keras hybrid model for lung cancer classification
- Web Speech API for speech recognition and synthesis
- HTML5/CSS3 with responsive design and dark/light theme toggle

  
✨ Key Features
•	• Interactive chatbot using a Hugging Face NLP model
•	• Voice assistant with speech recognition and TTS (text-to-speech)
•	• Mic button to switch to voice assistant in real-time
•	• Text/voice dual-mode support
•	• Professional and modern UI design using Bootstrap and CSS modules
•	• Persistent chat history and context awareness
•	• Export chat history as a .txt file
•	• Theme switching (Light/Dark mode)
•	• Mobile responsive layout (chatbox styled to mobile screen size)



📦 Modules & Implementation Breakdown
1. ChatBox.jsx: Handles the frontend chat UI, voice recognition, and chatbot responses.
2. ChatBox.css: Custom styles for modern look, dark/light themes, animations.
3. app.py: Flask backend server using BlenderBot for NLP responses.
4. model.py: Handles loading and inference of lung cancer detection model.
5. speech.js: Manages browser-based voice input and speech synthesis.

⚙️ How to Run the Project
1. Clone the repository and install dependencies.
2. Backend Setup:
   • Navigate to the backend directory
   • Run: pip install -r requirements.txt
   • Start server: python app.py
3. Frontend Setup:
   • Navigate to frontend directory
   • Run: npm install
   • Start React app: npm start
4. Access the application at http://localhost:5173

🎉 Final Thoughts
This project is a fantastic blend of AI, web technologies, and human-computer interaction. It's built with modularity, responsiveness, and accessibility in mind. We hope this assistant helps users understand their medical results better and inspires further innovation.
