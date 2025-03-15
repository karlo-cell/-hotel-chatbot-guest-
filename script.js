document.getElementById('send-btn').addEventListener('click', sendMessage);

// Define predefined responses
const responses = {
  "hi": "Hello! How can I assist you today?",
  "hello": "Hi there! How can I help you?",
  "what time is check-in": "Check-in time is at 3:00 PM.",
  "what time is check-out": "Check-out time is at 11:00 AM.",
  "do you offer room service": "Yes, we offer 24/7 room service. Would you like to see the menu?",
  "what's the wi-fi password": "The Wi-Fi password is 'Welcome123'. Enjoy your stay!",
  "do you have a pool": "Yes, we have a swimming pool. It's open from 8:00 AM to 8:00 PM.",
  "what are the breakfast hours": "Breakfast is served from 7:00 AM to 10:00 AM.",
  "can i get a late check-out": "Late check-out is subject to availability. Please contact the front desk for assistance.",
  "do you have parking": "Yes, we offer complimentary parking for all guests.",
  "how do i book a room": "You can book a room through our website or by calling our reservations team at +1-800-123-4567.",
  "what amenities do you offer": "We offer a range of amenities including a swimming pool, fitness center, free Wi-Fi, and 24/7 room service.",
  "default": "I'm sorry, I didn't understand that. Could you please rephrase?"
};

// Define regex patterns for flexible matching
const patterns = [
  { regex: /hi|hello|hey/i, response: responses["hi"] },
  { regex: /check-?in/i, response: responses["what time is check-in"] },
  { regex: /check-?out/i, response: responses["what time is check-out"] },
  { regex: /room service/i, response: responses["do you offer room service"] },
  { regex: /wi-?fi|internet|password/i, response: responses["what's the wi-fi password"] },
  { regex: /pool/i, response: responses["do you have a pool"] },
  { regex: /breakfast|morning meal/i, response: responses["what are the breakfast hours"] },
  { regex: /late check-?out/i, response: responses["can i get a late check-out"] },
  { regex: /parking|car park/i, response: responses["do you have parking"] },
  { regex: /book|reservation/i, response: responses["how do i book a room"] },
  { regex: /amenities|facilities/i, response: responses["what amenities do you offer"] }
];

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim().toLowerCase();
  if (!userInput) return;

  // Add user's message to the chat box
  appendMessage('user', userInput);

  // Get the bot's response
  const botResponse = getBotResponse(userInput);
  appendMessage('bot', botResponse);

  // Clear the input field
  document.getElementById('user-input').value = '';
}

function getBotResponse(userInput) {
  // Check for matching patterns
  for (const pattern of patterns) {
    if (pattern.regex.test(userInput)) {
      return pattern.response;
    }
  }
  // Default response if no match is found
  return responses['default'];
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}