const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Import routes
const integrationRoutes = require("./routes/integration");
const tickRoutes = require("./routes/tick");

// Use routes
app.use("/", integrationRoutes); // Handles GET /integration.json
app.use("/", tickRoutes);        // Handles POST /tick

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
