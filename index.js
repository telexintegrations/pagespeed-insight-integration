require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");



app.use(cors({
    origin: [
        "http://staging.telextest.im", // Telex staging domain
        "http://telextest.im",         // Telex test domain
        "https://staging.telex.im",    // Telex staging domain
        "https://telex.im"             // Telex production domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies and authentication headers
}));

app.use(express.json());

// Import routes
const integrationRoutes = require("./routes/integrationRoutes");
const tickRoutes = require("./routes/tickRoutes");

// Use routes
app.use("/", integrationRoutes);
app.use("/", tickRoutes);

const axios = require('axios');


// function keepAlive(){
//     axios.get(process.env.BASE_URL)
//         .then(() => console.log("Keeping service alive..."))
//         .catch(err => console.error("Error in keep-alive ping:", err.message));
// }
// // Use setInterval to ping to keep the instance alive on render
// setInterval(keepAlive, 5 * 60 * 1000); // Every 5 minutes

const PORT=process.env.PORT|| 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});