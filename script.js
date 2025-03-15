// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Sign-in popup
const signinPopup = document.getElementById('signin-popup');
const chatbot = document.getElementById('chatbot');
const roomNumberInput = document.getElementById('room-number');
const signinBtn = document.getElementById('signin-btn');

// Debugging: Log elements to ensure they are selected correctly
console.log("Sign-in Popup:", signinPopup);
console.log("Chatbot:", chatbot);
console.log("Room Number Input:", roomNumberInput);
console.log("Sign In Button:", signinBtn);

// Add event listener to the sign-in button
signinBtn.addEventListener('click', () => {
  console.log("Sign In button clicked!");

  const roomNumber = roomNumberInput.value.trim();
  console.log("Room number entered:", roomNumber);

  if (roomNumber) {
    console.log("Hiding popup and showing chatbot...");
    signinPopup.style.display = 'none';
    chatbot.classList.remove('hidden');
  } else {
    console.log("No room number entered.");
    alert("Please enter a valid room number.");
  }
});

// Chatbot logic
document.getElementById('send-btn').addEventListener('click', sendMessage);

document.querySelectorAll('.chat-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const question = event.target.getAttribute('data-question');
    sendMessage(question);
  });
});

const responses = {
  "what are the check-in/out times?": "Check-in is at 3:00 PM, and check-out is at 11:00 AM.",
  "what amenities do you offer?": "We offer a swimming pool, fitness center, free Wi-Fi, and 24/7 room service.",
  "can i order room service?": "Sure! What would you like to order?",
  "connect me to reception": "Connecting you to reception. Please wait...",
  "default": "I'm sorry, I didn't understand that. Could you please rephrase?"
};

function sendMessage(userInput) {
  if (!userInput) {
    userInput = document.getElementById('user-input').value.trim().toLowerCase();
    if (!userInput) return;
  }

  appendMessage('user', userInput);

  const botResponse = responses[userInput] || responses['default'];
  appendMessage('bot', botResponse);

  // Save messages to Firestore
  db.collection('chats').add({
    sender: 'user',
    message: userInput,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  db.collection('chats').add({
    sender: 'bot',
    message: botResponse,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById('user-input').value = '';
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}