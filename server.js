// server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const prompt = req.body.message;
    if (!prompt) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Get the generative model (synchronous)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate AI response
    const result = await model.generateContent({ prompt });

    // Get the text from the result (latest API usually uses output_text)
    const reply = result.output_text  result.outputText  "No response from AI";

    res.json({ reply });
  } catch (error) {
    console.error("DETAILED ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});