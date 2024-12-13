const axios = require('axios');

// Central register server URL
const registerServerUrl = 'https://temp-m3cb.onrender.com/get-server';

// Function to retrieve the IP and port of a target server
async function getServerDetails(serverIP) {
  try {
    const response = await axios.get(registerServerUrl, {
      params: { ip: serverIP },
    });

    const { ip, port } = response.data;
    console.log(`Server found: ${ip}:${port}`);
    return { ip, port };
  } catch (error) {
    console.error('Error retrieving server details:', error.response?.data || error.message);
    return null;
  }
}

// Function to connect to the target server
async function connectToServer(ip, port) {
  try {
    const response = await axios.get(`http://${ip}:${port}`);
    console.log('Connected to server:', response.data);
  } catch (error) {
    console.error('Failed to connect to the server:', error.message);
  }
}

// Example Usage
(async () => {
  const serverIP = '192.168.1.100'; // Replace with the desired server's IP or name
  const serverDetails = await getServerDetails(serverIP);

  if (serverDetails) {
    await connectToServer(serverDetails.ip, serverDetails.port);
  }
})();
