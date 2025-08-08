# 🤖 PyHub Chatbot Setup Guide

Your PyHub now has a functional AI chatbot! Here's how to set it up and make it work.

## 🎯 **What's Changed**

✅ **Multi-Provider AI Integration** - Support for 3 free AI services
✅ **API Key Management** - Secure local storage of API keys
✅ **Fallback System** - Tries multiple providers if one fails
✅ **Settings Panel** - Easy configuration interface

## 🔑 **Free AI Provider Options**

### **Option 1: Hugging Face (Recommended - Completely Free)**

1. **Sign up**: Go to [huggingface.co](https://huggingface.co)
2. **Get token**: Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. **Create token**: Click "New token" → Name it "PyHub" → Select "Read" role
4. **Copy token**: Starts with `hf_...`

**Pros**: Completely free, no credit card required
**Cons**: May have rate limits, responses can be slower

### **Option 2: Groq (Fast & Free Tier)**

1. **Sign up**: Go to [console.groq.com](https://console.groq.com)
2. **Get API key**: Visit [console.groq.com/keys](https://console.groq.com/keys)
3. **Create key**: Click "Create API Key" → Name it "PyHub"
4. **Copy key**: Starts with `gsk_...`

**Pros**: Very fast responses, good quality
**Cons**: Limited free tier (requests per day)

### **Option 3: Cohere (Good Free Tier)**

1. **Sign up**: Go to [cohere.ai](https://cohere.ai)
2. **Get API key**: Visit [dashboard.cohere.ai/api-keys](https://dashboard.cohere.ai/api-keys)
3. **Create key**: Click "Create API Key" → Name it "PyHub"
4. **Copy key**: Starts with `co-...`

**Pros**: Good balance of speed and quality
**Cons**: Limited free tier

## 🚀 **Setup Instructions**

### **Step 1: Configure API Keys**

1. **Open your PyHub**: Go to https://nadspace.github.io/pyhub
2. **Navigate to Chatbot**: Click the "Chatbot" button
3. **Open Settings**: Click the ⚙️ settings icon in the top-right
4. **Add API Keys**: 
   - Paste your Hugging Face token in the first field
   - Paste your Groq key in the second field (optional)
   - Paste your Cohere key in the third field (optional)
5. **Save**: Click "Save Keys"
6. **Test**: Click "Test Connection"

### **Step 2: Test the Chatbot**

1. **Ask a question**: Type "What are Python lists?" in the chat
2. **Check response**: You should get an AI-generated response
3. **Try different styles**: Change response style in settings

## 🔧 **How It Works**

### **Fallback System**
- Tries Hugging Face first (if configured)
- Falls back to Groq if HF fails
- Falls back to Cohere if Groq fails
- Uses local knowledge base if all fail

### **Response Styles**
- **🎯 Balanced**: Normal detailed responses
- **📚 Detailed**: Comprehensive explanations with examples
- **⚡ Concise**: Brief, to-the-point answers
- **🎓 Beginner-Friendly**: Simple explanations for beginners

### **Security**
- API keys stored locally in your browser
- Keys never sent to GitHub or other servers
- Only sent directly to the AI provider APIs

## 🎨 **Customization Options**

### **Easy Customization**
You can modify the chatbot by editing these parts in `pyhub.html`:

1. **Change AI Models**: Edit the model names in the API functions
2. **Add More Providers**: Add new API functions following the same pattern
3. **Modify Prompts**: Change the system prompts for different behavior
4. **Adjust Styling**: Modify the CSS classes for different appearance

### **Advanced: Add Your Own AI Provider**

```javascript
// Add this function to the script section
async function callYourAPI(message) {
    const apiKey = localStorage.getItem('your_api_key');
    if (!apiKey) throw new Error('Your API key not configured');

    const response = await fetch('https://your-api-endpoint.com/chat', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            // your API parameters
        })
    });

    if (!response.ok) {
        throw new Error(`Your API error: ${response.status}`);
    }

    const data = await response.json();
    return {
        message: data.response, // adjust based on your API response format
        provider: 'your-provider'
    };
}
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Setup Required" Status**
   - Make sure you've entered at least one API key
   - Click "Save Keys" after entering keys
   - Refresh the page

2. **"Connection Failed" Error**
   - Check your API key is correct
   - Verify you have internet connection
   - Try a different provider

3. **No Response from Chatbot**
   - Open browser developer tools (F12)
   - Check Console tab for error messages
   - Verify API keys are saved in localStorage

4. **Rate Limit Errors**
   - You've exceeded the free tier limits
   - Wait a few hours or try a different provider
   - Consider upgrading to paid tier

### **Testing Steps**

1. **Check API Keys**: Open browser dev tools → Application → Local Storage → Check for saved keys
2. **Test Connection**: Use the "Test Connection" button in settings
3. **Check Network**: Dev tools → Network tab → See if API calls are being made
4. **Check Console**: Dev tools → Console → Look for error messages

## 🎉 **Success!**

Once configured, your chatbot will:
- ✅ Answer Python programming questions
- ✅ Help debug code
- ✅ Provide examples and explanations
- ✅ Adapt response style to your preference
- ✅ Remember conversation context
- ✅ Work offline with fallback knowledge

## 📞 **Need Help?**

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your API keys are correct
3. Try different AI providers
4. Check browser console for errors

Your PyHub chatbot is now ready to help with Python programming! 🐍✨
