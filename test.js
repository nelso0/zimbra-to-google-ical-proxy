const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Test parameters
const port = process.env.PORT || 3000;
const testUsername = 'test-user';
const testPassword = 'test-password';

async function testCalendarAPI() {
  console.log('Testing Calendar Proxy API...');
  
  try {
    // Test root endpoint
    console.log('\nTesting root endpoint:');
    const rootResponse = await axios.get(`http://localhost:${port}/`);
    console.log(`Status: ${rootResponse.status}`);
    console.log(`Response: ${rootResponse.data}`);
    
    // Test calendar endpoint
    console.log('\nTesting calendar endpoint:');
    console.log(`Using test credentials: ${testUsername}:${testPassword}`);
    
    try {
      const calendarResponse = await axios.get(
        `http://localhost:${port}/calendar?username=${testUsername}&password=${testPassword}`,
        { responseType: 'arraybuffer' }
      );
      
      console.log(`Status: ${calendarResponse.status}`);
      console.log(`Content-Type: ${calendarResponse.headers['content-type']}`);
      
      // Save response to a file for inspection
      fs.writeFileSync('test-calendar.ics', calendarResponse.data);
      console.log('Calendar data saved to test-calendar.ics');
      
    } catch (error) {
      console.log('Calendar endpoint test failed (expected with test credentials)');
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', JSON.parse(error.response.data.toString()));
      } else {
        console.error(error.message);
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testCalendarAPI(); 