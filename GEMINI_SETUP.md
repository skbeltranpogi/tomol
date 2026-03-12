# Gemini API Setup Instructions

## How to Get Your Gemini API Key

1. Go to Google AI Studio: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## How to Add Your API Key

1. Open `chatbot.js` file
2. Find this line at the top:
   ```javascript
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
4. Save the file

Example:
```javascript
const API_KEY = 'AIzaSyABC123def456GHI789jkl012MNO345pqr';
```

## Important Notes

- Keep your API key private and never share it publicly
- Don't commit your API key to GitHub
- The API key is free to use with rate limits
- For production, consider using environment variables

## Testing

1. Open `chatbot.html` in your browser
2. Type a message and press Send
3. The AI should respond within a few seconds

If you get an error, check:
- Your API key is correct
- You have internet connection
- The API key has proper permissions
