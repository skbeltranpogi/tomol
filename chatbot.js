// Gemini API Configuration (2026 Updated)
const API_KEY = 'AIzaSyA312x2d8EKm-Ft34KOIh8UIrcYW9o9ESY'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotTrash = document.getElementById('chatbotTrash');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Load chat history when page loads
window.addEventListener('DOMContentLoaded', loadChatHistory);

// Toggle chatbot window
chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotButton.style.display = 'none';
    chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotButton.style.display = 'flex';
});

// Clear chat history
chatbotTrash.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
        clearChatHistory();
    }
});

// Send message on button click
chatbotSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (message === '') return;
    
    // Check if replying to a message
    const replyPreview = document.getElementById('replyPreview');
    const replyToId = replyPreview.getAttribute('data-reply-to');
    const replyToText = replyToId ? document.getElementById('replyPreviewMessage').textContent : null;
    
    // Add user message
    addChatMessage(message, 'user', replyToText);
    chatbotInput.value = '';
    
    // Close reply preview
    if (replyToId) {
        closeReplyPreview();
    }
    
    // Show typing indicator
    showTyping();
    
    // Context about the Logic Gallery website
    const websiteContext = `You are an AI assistant for the Logic Gallery website. Here's what you need to know:

- This is a premium logic gallery website called "GOD CODE"
- The website has 4 main pages:
  1. Home Page: Welcome page with animated particle background
  2. Portfolio Page: Showcases 5 different project applications
  3. Favorites Page: Gallery with 8 artworks (one.jpg through eight.jpg)
  4. AI Chat Page: Where users can talk to you

- Features:
  * Interactive particle.js background that responds to hover and clicks
  * Glassmorphism design style
  * Like/Unlike functionality with heart icons on artworks
  * Comment system where users can add comments to each artwork
  * Responsive navigation bar

- Technologies: HTML5, CSS3, JavaScript, Particles.js
- Design: GOD CODE Team

When users ask about the gallery, artworks, features, or navigation, provide helpful information based on these details. Be friendly and helpful!

User question: ${message}`;
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: websiteContext
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            removeTyping();
            
            if (response.status === 400) {
                addChatMessage('Please add your Gemini API key in chatbot.js file. Get it from: https://makersuite.google.com/app/apikey', 'bot');
            } else if (response.status === 429) {
                addChatMessage('⏳ Rate limit reached. The free tier allows 15 requests per minute. Please wait about 60 seconds before trying again. Monitor usage at: https://ai.dev/rate-limit', 'bot');
            } else {
                addChatMessage('API Error: ' + (errorData.error?.message || 'Unknown error'), 'bot');
            }
            return;
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTyping();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addChatMessage(botResponse, 'bot');
        } else {
            console.error('Unexpected response:', data);
            addChatMessage('Sorry, I received an unexpected response. Please try again.', 'bot');
        }
        
    } catch (error) {
        console.error('Error:', error);
        removeTyping();
        addChatMessage('Connection error. Please check your internet connection and API key.', 'bot');
    }
}

function addChatMessage(text, sender, replyTo = null) {
    const messageId = Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.setAttribute('data-message-id', messageId);
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="chatbot-message-avatar">🤖</div>
            <div class="chatbot-message-wrapper">
                <div class="chatbot-message-content">
                    <p>${text}</p>
                    <div class="message-reactions" id="reaction-display-${messageId}"></div>
                </div>
                <div class="message-actions">
                    <button class="reaction-btn" onclick="toggleReactions(${messageId})">😊</button>
                    <button class="more-btn" onclick="toggleMoreMenu(${messageId})">⋮</button>
                </div>
                <div class="reactions-popup" id="reactions-${messageId}" style="display: none;">
                    <span onclick="addReaction(${messageId}, '❤️')">❤️</span>
                    <span onclick="addReaction(${messageId}, '😂')">😂</span>
                    <span onclick="addReaction(${messageId}, '😮')">😮</span>
                    <span onclick="addReaction(${messageId}, '😢')">😢</span>
                    <span onclick="addReaction(${messageId}, '👍')">👍</span>
                    <span onclick="addReaction(${messageId}, '👎')">👎</span>
                </div>
                <div class="more-menu" id="more-${messageId}" style="display: none;">
                    <div onclick="replyMessage(${messageId}, '${text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">Reply</div>
                    <div onclick="deleteMessage(${messageId})">Delete</div>
                    <div onclick="pinMessage(${messageId})">Pin</div>
                    <div onclick="reportMessage(${messageId})">Report</div>
                </div>
            </div>
        `;
    } else {
        const replyHTML = replyTo ? `<div class="message-reply-indicator">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2L3 7h3v5h4V7h3L8 2z" transform="rotate(180 8 8)"/>
            </svg>
            <span>You replied to ${replyTo.length > 30 ? replyTo.substring(0, 30) + '...' : replyTo}</span>
        </div>` : '';
        
        messageDiv.innerHTML = `
            <div class="chatbot-message-wrapper">
                <div class="chatbot-message-content">
                    ${replyHTML}
                    <p>${text}</p>
                    <div class="message-reactions" id="reaction-display-${messageId}"></div>
                </div>
                <div class="message-actions">
                    <button class="reaction-btn" onclick="toggleReactions(${messageId})">😊</button>
                    <button class="more-btn" onclick="toggleMoreMenu(${messageId})">⋮</button>
                </div>
                <div class="reactions-popup" id="reactions-${messageId}" style="display: none;">
                    <span onclick="addReaction(${messageId}, '❤️')">❤️</span>
                    <span onclick="addReaction(${messageId}, '😂')">😂</span>
                    <span onclick="addReaction(${messageId}, '😮')">😮</span>
                    <span onclick="addReaction(${messageId}, '😢')">😢</span>
                    <span onclick="addReaction(${messageId}, '👍')">👍</span>
                    <span onclick="addReaction(${messageId}, '👎')">👎</span>
                </div>
                <div class="more-menu" id="more-${messageId}" style="display: none;">
                    <div onclick="replyMessage(${messageId}, '${text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">Reply</div>
                    <div onclick="unsendMessage(${messageId})">Unsend</div>
                    <div onclick="pinMessage(${messageId})">Pin</div>
                    <div onclick="reportMessage(${messageId})">Report</div>
                </div>
            </div>
            <div class="chatbot-message-avatar">👤</div>
        `;
    }
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Save to localStorage
    saveChatHistory(text, sender, messageId, replyTo);
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="chatbot-message-avatar">🤖</div>
        <div class="chatbot-message-content">
            <div class="chatbot-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Save chat message to localStorage
function saveChatHistory(text, sender, messageId, replyTo = null) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push({ text, sender, messageId, replyTo, timestamp: Date.now() });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load chat history from localStorage
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    
    // Clear default welcome message
    chatbotMessages.innerHTML = '';
    
    if (chatHistory.length === 0) {
        // Show default welcome message if no history
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'chatbot-message bot';
        welcomeDiv.innerHTML = `
            <div class="chatbot-message-avatar">🤖</div>
            <div class="chatbot-message-wrapper">
                <div class="chatbot-message-content">
                    <p>Hello! How may I help you?</p>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(welcomeDiv);
    } else {
        // Load all previous messages
        chatHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chatbot-message ${msg.sender}`;
            messageDiv.setAttribute('data-message-id', msg.messageId);
            
            if (msg.sender === 'bot') {
                messageDiv.innerHTML = `
                    <div class="chatbot-message-avatar">🤖</div>
                    <div class="chatbot-message-wrapper">
                        <div class="chatbot-message-content">
                            <p>${msg.text}</p>
                            <div class="message-reactions" id="reaction-display-${msg.messageId}"></div>
                        </div>
                        <div class="message-actions">
                            <button class="reaction-btn" onclick="toggleReactions(${msg.messageId})">😊</button>
                            <button class="more-btn" onclick="toggleMoreMenu(${msg.messageId})">⋮</button>
                        </div>
                        <div class="reactions-popup" id="reactions-${msg.messageId}" style="display: none;">
                            <span onclick="addReaction(${msg.messageId}, '❤️')">❤️</span>
                            <span onclick="addReaction(${msg.messageId}, '😂')">😂</span>
                            <span onclick="addReaction(${msg.messageId}, '😮')">😮</span>
                            <span onclick="addReaction(${msg.messageId}, '😢')">😢</span>
                            <span onclick="addReaction(${msg.messageId}, '👍')">👍</span>
                            <span onclick="addReaction(${msg.messageId}, '👎')">👎</span>
                        </div>
                        <div class="more-menu" id="more-${msg.messageId}" style="display: none;">
                            <div onclick="replyMessage(${msg.messageId}, '${msg.text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">Reply</div>
                            <div onclick="deleteMessage(${msg.messageId})">Delete</div>
                            <div onclick="pinMessage(${msg.messageId})">Pin</div>
                            <div onclick="reportMessage(${msg.messageId})">Report</div>
                        </div>
                    </div>
                `;
            } else {
                const replyHTML = msg.replyTo ? `<div class="message-reply-indicator">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 2L3 7h3v5h4V7h3L8 2z" transform="rotate(180 8 8)"/>
                    </svg>
                    <span>You replied to ${msg.replyTo.length > 30 ? msg.replyTo.substring(0, 30) + '...' : msg.replyTo}</span>
                </div>` : '';
                
                messageDiv.innerHTML = `
                    <div class="chatbot-message-wrapper">
                        <div class="chatbot-message-content">
                            ${replyHTML}
                            <p>${msg.text}</p>
                            <div class="message-reactions" id="reaction-display-${msg.messageId}"></div>
                        </div>
                        <div class="message-actions">
                            <button class="reaction-btn" onclick="toggleReactions(${msg.messageId})">😊</button>
                            <button class="more-btn" onclick="toggleMoreMenu(${msg.messageId})">⋮</button>
                        </div>
                        <div class="reactions-popup" id="reactions-${msg.messageId}" style="display: none;">
                            <span onclick="addReaction(${msg.messageId}, '❤️')">❤️</span>
                            <span onclick="addReaction(${msg.messageId}, '😂')">😂</span>
                            <span onclick="addReaction(${msg.messageId}, '😮')">😮</span>
                            <span onclick="addReaction(${msg.messageId}, '😢')">😢</span>
                            <span onclick="addReaction(${msg.messageId}, '👍')">👍</span>
                            <span onclick="addReaction(${msg.messageId}, '👎')">👎</span>
                        </div>
                        <div class="more-menu" id="more-${msg.messageId}" style="display: none;">
                            <div onclick="replyMessage(${msg.messageId}, '${msg.text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">Reply</div>
                            <div onclick="unsendMessage(${msg.messageId})">Unsend</div>
                            <div onclick="pinMessage(${msg.messageId})">Pin</div>
                            <div onclick="reportMessage(${msg.messageId})">Report</div>
                        </div>
                    </div>
                    <div class="chatbot-message-avatar">👤</div>
                `;
            }
            
            chatbotMessages.appendChild(messageDiv);
        });
    }
    
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Clear chat history (optional - you can add a button for this)
function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    chatbotMessages.innerHTML = '';
    loadChatHistory();
}

// Toggle reactions popup
function toggleReactions(messageId) {
    const popup = document.getElementById(`reactions-${messageId}`);
    const allPopups = document.querySelectorAll('.reactions-popup');
    allPopups.forEach(p => { if (p.id !== `reactions-${messageId}`) p.style.display = 'none'; });
    popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
}

// Toggle more menu
function toggleMoreMenu(messageId) {
    const menu = document.getElementById(`more-${messageId}`);
    const allMenus = document.querySelectorAll('.more-menu');
    allMenus.forEach(m => { if (m.id !== `more-${messageId}`) m.style.display = 'none'; });
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// Add reaction to message (only one reaction per user)
function addReaction(messageId, emoji) {
    const reactionDisplay = document.getElementById(`reaction-display-${messageId}`);
    
    // Clear previous reaction and set new one
    reactionDisplay.innerHTML = '';
    const reactionSpan = document.createElement('span');
    reactionSpan.className = 'reaction-item';
    reactionSpan.textContent = emoji;
    reactionDisplay.appendChild(reactionSpan);
    
    toggleReactions(messageId);
}

// Reply to message
function replyMessage(messageId, text) {
    const replyPreview = document.getElementById('replyPreview');
    const replyPreviewMessage = document.getElementById('replyPreviewMessage');
    const shortText = text.length > 50 ? text.substring(0, 50) + '...' : text;
    
    replyPreviewMessage.textContent = shortText;
    replyPreview.style.display = 'flex';
    replyPreview.setAttribute('data-reply-to', messageId);
    
    chatbotInput.focus();
    toggleMoreMenu(messageId);
}

// Close reply preview
function closeReplyPreview() {
    const replyPreview = document.getElementById('replyPreview');
    replyPreview.style.display = 'none';
    replyPreview.removeAttribute('data-reply-to');
}

// Unsend message
function unsendMessage(messageId) {
    if (confirm('Are you sure you want to unsend this message?')) {
        deleteMessage(messageId);
    }
}

// Delete message (works for both user and bot messages)
function deleteMessage(messageId) {
    const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageDiv) {
        messageDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
            
            // Remove from localStorage
            let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
            chatHistory = chatHistory.filter(msg => msg.messageId !== messageId);
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }, 300);
    }
    toggleMoreMenu(messageId);
}

// Pin message
function pinMessage(messageId) {
    const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageDiv) {
        messageDiv.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
        messageDiv.style.border = '2px solid gold';
        alert('Message pinned!');
    }
    toggleMoreMenu(messageId);
}

// Report message
function reportMessage(messageId) {
    alert('Message reported. Thank you for your feedback.');
    toggleMoreMenu(messageId);
}

// Close popups when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.message-actions') && !e.target.closest('.reactions-popup') && !e.target.closest('.more-menu')) {
        document.querySelectorAll('.reactions-popup, .more-menu').forEach(el => el.style.display = 'none');
    }
});