import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { HfInference } from "@huggingface/inference";

const app = express();
const hf = new HfInference(process.env.HF_TOKEN);

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // This serves your HTML files

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await hf.chatCompletion({
            model: "HuggingFaceH4/zephyr-7b-beta",
            messages: [
                { role: "system", content: "You are an Ethiopia travel expert. Speak Amharic." },
                { role: "user", content: message }
            ],
            max_tokens: 500,
        }, { wait_for_model: true });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "AI is warming up, try again in 10 seconds." });
        // Inside server.js
const response = await hf.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.3",
    messages: [
        { role: "system", content: "You are an Ethiopia travel guide. Speak Amharic." },
        { role: "user", content: message }
    ],
    max_tokens: 500,
}, { 
    wait_for_model: true // <--- ADD THIS LINE HERE
});
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));