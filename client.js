const axios = require('axios');
const os = require('os');
const http = require('http');

// Get the dynamic IP address and port (for this example, using localhost and port 3000)
const dynamicIP = getLocalIP();
const port = 3000;

// Central register server URL (Replace with your actual URL)
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

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is the target server!');
  }).listen(port, dynamicIP, () => {
    console.log(`Server is running on http://${dynamicIP}:${port}`);
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

// Function to simulate the server running and periodically sending updates
function startServer() {
  // Create a simple HTTP server (optional, just for testing)
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running');
  }).listen(port, dynamicIP, () => {
    console.log(`Server is running on http://${dynamicIP}:${port}`);
  });

  // Send the dynamic IP and port to the register server every 30 seconds
  setInterval(sendDynamicIP, 30000); // Update every 30 seconds
}

startServer();
