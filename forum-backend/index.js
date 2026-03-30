// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to talk to this API
app.use(express.json()); // Parses incoming JSON data from forms

app.get('/', (req, res) => {
  res.send('Forum API is running. Try hitting /api/status');
});

// A simple test route to make sure it works
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend API is running smoothly!' });
});

// Define the port (uses .env if available, otherwise 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});