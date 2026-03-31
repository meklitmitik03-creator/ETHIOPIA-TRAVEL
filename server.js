require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    console.log("User sent:", message); // Look for this in your terminal!

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            res.json({ reply: aiText });
        } else {
            console.error("Gemini Error Detail:", data);
            res.status(500).json({ error: "Gemini rejected the request" });
        }
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "AI Server Error" });
    }
});

app.listen(3000, () => console.log("🚀 Server is running on port 3000"));