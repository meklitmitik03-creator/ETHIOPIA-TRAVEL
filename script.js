app.use(express.static('public'));
async function explore(category) {
    const modal = document.getElementById('exploreModal');
    const display = document.getElementById('modalData');
    modal.style.display = "block";

    try {
        // This calls your Node.js API we built earlier!
        const response = await fetch(`/api/destinations?category=${category}`);
        const data = await response.json();
        
        if(data.length > 0) {
            display.innerHTML = `<h3>Top ${category} Spots</h3>` + 
                data.map(item => `<div class='item'><strong>${item.name}</strong>: ${item.description}</div>`).join('');
        } else {
            display.innerHTML = `<h3>Exploring ${category}...</h3><p>We are gathering the best data for you!</p>`;
        }
    } catch (err) {
        display.innerHTML = "Error connecting to database.";
    }
}

function closeModal() {
    document.getElementById('exploreModal').style.display = "none";
}
const path = require('path');

// This tells the server to look INSIDE the public folder for index.html
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use(express.static('public'))
async function handleChat() {
    const input = document.getElementById('chatInput');
    const message = input.value;
    if (!message) return;

    // Call your local Node.js server
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    // Update your chat UI with data.reply here...
    console.log("AI says:", data.reply);
}
async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');
    const message = input.value.trim();

    if (!message) return;

    // 1. Show user message
    chatContent.innerHTML += `<div style="text-align:right; margin:10px; color:#ffca28;">You: ${message}</div>`;
    input.value = '';

    // 2. Show "Thinking..." state
    const loadingDiv = document.createElement("div");
    loadingDiv.innerText = "Gemini is thinking...";
    chatContent.appendChild(loadingDiv);

    try {
        // 3. CALL YOUR LOCAL SERVER
        const response = await fetch('https://shiny-dollop-x5gxg6gw49g43645p-3000.app.github.dev/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // 4. Show AI response
        loadingDiv.innerText = "AI: " + data.reply;
    } catch (error) {
        loadingDiv.innerText = "Error: Could not connect to the server.";
    }
    
    chatContent.scrollTop = chatContent.scrollHeight;
}
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchInput = document.querySelector('.search-input'); // Ensure this selector matches your input
        if (searchInput) {
            searchInput.value = searchQuery;
            // Trigger your existing search function here
            handleSearch(); 
        }
    }
}
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const searchInput = document.querySelector('.search-card input'); // Adjust selector to match your search input
        if (searchInput) {
            searchInput.value = searchQuery;
            // If you have a search function, call it here:
            // findPlace(searchQuery); 
        }
    }
}