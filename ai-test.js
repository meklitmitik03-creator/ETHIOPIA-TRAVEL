import 'dotenv/config'; 
import { HfInference } from "@huggingface/inference";
import readline from "readline";

// Initialize with your token from .env
const hf = new HfInference(process.env.HF_TOKEN);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function startChat() {
    console.log("\n===========================================");
    console.log("   ETHIOPIA TRAVEL AI (Stable Mode)       ");
    console.log("===========================================");
    console.log("Checking token...");

    if (!process.env.HF_TOKEN) {
        console.error("❌ ERROR: HF_TOKEN not found in .env file!");
        return rl.close();
    }

    console.log("✅ Token detected. Type your message below.");
    console.log("Type 'exit' to quit.\n");

    const askQuestion = () => {
        rl.question("You: ", async (userInput) => {
            if (userInput.toLowerCase() === 'exit') return rl.close();

            try {
                process.stdout.write("AI is thinking... ⏳\r");

                const response = await hf.chatCompletion({
                    model: "HuggingFaceH4/zephyr-7b-beta",
                    messages: [
                        { 
                            role: "system", 
                            content: "You are an expert Ethiopia travel guide. Always respond in Amharic (አማርኛ) unless asked otherwise. Be helpful and polite." 
                        },
                        { role: "user", content: userInput }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                }, {
                    wait_for_model: true // THIS PREVENTS THE HTTP ERROR
                });

                const aiText = response.choices[0].message.content;
                console.log("\nAI (አማርኛ):", aiText);
                console.log("\n-------------------------------------------");
                askQuestion(); 
            } catch (error) {
                console.log("\n[Notice]: The server is warming up. Please wait 10 seconds and try again.");
                // Automatically try again so the user doesn't have to restart the script
                setTimeout(askQuestion, 2000); 
            }
        });
    };

    askQuestion();
}

startChat();