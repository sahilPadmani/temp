const axios = require('axios');
const os = require('os');
const http = require('http');

// Get the dynamic IP address and port
const dynamicIP = getLocalIP();
const port = 7070;

// Central register server URL
const registerServerUrl = 'https://temp-m3cb.onrender.com/update-ip';

// Function to get local IP address (excluding the loopback address)
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const address of interfaces[interfaceName]) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return null; // Fallback if no external IP is found
}

// Create the main HTTP server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is the target server!');
}).listen(port, dynamicIP, () => {
  console.log(`Server is running on http://${dynamicIP}:${port}`);
  // Send the IP and port to the register server immediately after starting
  sendDynamicIP();
});

// Function to send the dynamic IP and port to the register server
async function sendDynamicIP() {
  try {
    const response = await axios.post(registerServerUrl, {
      ip: dynamicIP,
      port: port,
    });
    console.log(`Successfully updated IP: ${dynamicIP} with port: ${port}`);
  } catch (error) {
    console.error('Failed to update IP and port:', error.message);
  }
}

// Periodically send the dynamic IP and port to the register server
setInterval(sendDynamicIP, 3000); // Update every 30 seconds
