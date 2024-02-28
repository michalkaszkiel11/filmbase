const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000; // Updated PORT definition
app.use(cors());
app.use(express.json());
app.use("/api", router);

// SQL Server configuration

// Endpoint to get users

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
