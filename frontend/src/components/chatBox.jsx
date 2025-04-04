import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const recognitionRef = useRef(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserMessage(transcript);
                sendMessage(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
    const toggleVoiceMode = () => setIsVoiceMode(prev => !prev);

    const toggleListening = () => {
        if (recognitionRef.current) {
            if (!isListening) {
                recognitionRef.current.start();
                setIsListening(true);
            } else {
                recognitionRef.current.stop();
                setIsListening(false);
            }
        }
    };

    const sendMessage = (text = userMessage) => {
        if (!text.trim()) return;

        const userMsg = { text, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setUserMessage("");

        fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        })
            .then(res => res.json())
            .then(data => {
                const botText = data.response;
                const botMsg = { text: botText, sender: "bot" };
                setMessages(prev => [...prev, botMsg]);

                if (isVoiceMode && window.speechSynthesis) {
                    const utterance = new SpeechSynthesisUtterance(botText);
                    window.speechSynthesis.speak(utterance);
                }
            })
            .catch(err => console.error("Error:", err));
    };

    const handleExport = () => {
        const chatHistory = messages.map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`).join("\n");
        const blob = new Blob([chatHistory], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "chat_history.txt";
        link.click();
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>AI Assistant</h2>
                <div className="top-buttons">
                    <button className="theme-btn" onClick={toggleTheme}>
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    <button className="export-btn" onClick={handleExport}>
                        📁 Export
                    </button>
                </div>
            </div>

            <div className="chat-body">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {isListening && <div className="listening-animation">🎤 Listening...</div>}
                <div ref={chatEndRef}></div>
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    value={userMessage}
                    onChange={e => setUserMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={() => sendMessage()}>Send</button>
            </div>

            <button className="mic-btn" onClick={toggleListening}>
                🎙️
            </button>

            <button className="voice-toggle-btn" onClick={toggleVoiceMode}>
                {isVoiceMode ? "🗨️ Chat" : "🎤 Voice"}
            </button>
        </div>
    );
};

export default ChatBox;
