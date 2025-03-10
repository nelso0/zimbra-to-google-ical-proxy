const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const zimbraBaseUrl = process.env.ZIMBRA_BASE_URL || 'http://collegezimbra.college.com/etc';

app.get('/', (req, res) => {
  res.send('Calendar Proxy API is running. Use /calendar endpoint with username and password parameters.');
});

app.get('/calendar', async (req, res) => {
  const { username, password } = req.query;
  
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required as query parameters' });
  }

  try {
    // Make request to Zimbra calendar with basic auth
    const response = await axios.get(zimbraBaseUrl, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        'Accept': 'text/calendar'
      },
      responseType: 'arraybuffer'  // Get the raw binary data
    });

    // Set appropriate headers for ICS file
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
    
    // Send the ICS file content
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching calendar:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: `Failed to fetch calendar: ${error.response.statusText}`,
        status: error.response.status
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

app.listen(port, () => {
  console.log(`Calendar Proxy API listening at http://localhost:${port}`);
}); 