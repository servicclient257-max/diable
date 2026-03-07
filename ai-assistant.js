const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Use OpenAI API to validate or interact with the registration
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: `Validate registration for user: ${username}, with password: ${password}.`,
            max_tokens: 50,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });

        res.status(200).send({ message: 'Registration processed.', response: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send({ error: 'Failed to communicate with OpenAI API.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});