const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('./'));

// Local Smart Chatbot proxy endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, style, original_message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Proxying to Smart Chatbot:', message, 'Style:', style);

        // Forward request to Smart Chatbot backend with style
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                style: style || 'balanced',
                original_message: original_message || message
            })
        });

        if (!response.ok) {
            throw new Error(`Smart Chatbot error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Smart Chatbot response received with style:', data.style);
        res.json(data);

    } catch (error) {
        console.error('Smart Chatbot Proxy Error:', error);

        // Fallback response
        res.json({
            message: 'I am currently running in basic mode. For Python questions, try asking about lists, functions, loops, or variables!',
            confidence: 0.1,
            category: 'fallback',
            style: 'balanced'
        });
    }
});



// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pyhub.html'));
});

app.listen(port, () => {
    console.log(`PyHub is running at http://localhost:${port}`);
}); 