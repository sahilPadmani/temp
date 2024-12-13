const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// To store the IP addresses (could be a database in a real-world application)
let serverList = {};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to update the server IP and port
app.post('/update-ip', (req, res) => {
  const { ip, port } = req.body;

  if (ip && port) {
    // Save the dynamic IP and port (can store in a database)
    serverList[ip] = port;
    console.log(`Received update: ${ip}:${port}`);
    res.status(200).send({ message: 'IP and port updated successfully' });
  } else {
    res.status(400).send({ message: 'Invalid data' });
  }
});

// Endpoint to get the registered servers
app.get('/servers', (req, res) => {
  res.json(serverList);
});

app.get('/get-server', (req, res) => {
    const { ip } = req.query; // Assume the user provides the server's name or IP in the query
  
    if (ip && serverList[ip]) {
      res.status(200).json({ ip: ip, port: serverList[ip] });
    } else {
      res.status(404).json({ message: 'Server not found' });
    }
  });

// Start the register server on port 4000 (or another port)
app.listen(4000, () => {
  console.log('Register server running on http://localhost:4000');
});

