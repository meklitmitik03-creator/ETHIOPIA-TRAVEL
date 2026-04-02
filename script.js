// server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
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

    // Generate content from Gemini
    const result = await model.generateContent({ prompt });

    // Extract the text response
    const reply = result.output_text  result.outputText  "No response from AI";

    // Send JSON back to frontend
    res.json({ reply });
  } catch (error) {
    console.error("DETAILED ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
