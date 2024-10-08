const chatContainer = document.getElementById('chat-container');
const apiKey = 'AIzaSyD1LmuHrMHSKyNXpeZYZTS37C3LSr3QsRo'; // Replace with your actual API key

/**
 curl \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
  -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'
 */

function sendMessage(message) {
    const url = 'https://api.gemini.com/chat';
    const data = {
        prompt: message,
        model: 'gemini-1.5-flash' // Adjust model as needed
    };

    axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        const reply = response.data.response;
        const messageElement = document.createElement('div');
        messageElement.textContent = reply;
        chatContainer.appendChild(messageElement);
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}

// Example usage:
sendMessage('Hello, how are you today?');