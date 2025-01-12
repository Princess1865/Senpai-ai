// Function to add a message to the chat
function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to get AI response (simplified)
async function getAIResponse(userMessage) {
    // This is a mock response. In a real application, you would call an AI API here
    const responses = [
        "Sup! What do you want?",
        "That's a W question!",
        "-1000 aura question",
        "Who do you want to rizz with this question?",
        "let me ask my brain...",
        "I'm here to assist you!",
        
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to handle sending messages
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Get and add AI response
    const aiResponse = await getAIResponse(message);
    addMessage(aiResponse, false);
}

// Add event listener for Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 