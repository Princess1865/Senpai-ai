// Function to add a message to the chat
function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to get AI response
async function getAIResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return "wait!.";
    }
}

// Function to handle sending messages
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Add loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.textContent = 'Typing...';
    document.getElementById('chatMessages').appendChild(loadingDiv);
    
    try {
        // Get AI response
        const aiResponse = await getAIResponse(message);
        // Remove loading message
        loadingDiv.remove();
        // Add AI response
        addMessage(aiResponse, false);
    } catch (error) {
        loadingDiv.remove();
        addMessage("I said wait!.", false);
    }
}

// Add event listener for Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 