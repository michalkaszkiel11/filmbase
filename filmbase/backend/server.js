const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 10000; // Updated PORT definition

// SQL Server configuration
const config = {
    user: "kaszkiel",
    password: "michal",
    server: "MSI\\SQLEXPRESS",
    database: "tutorial",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: false,
        instanceName: "SQLEXPRESS",
        integratedSecurity: true,
    },
    port: 1433,
};

const getUsers = async () => {
    try {
        console.log("Attempting to get users");
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .query("SELECT * FROM EmployeeDemographics");
        console.log("Connected to the database!");
        console.log(result.recordset); // Logging only the recordset
        return result.recordset; // Returning the recordset
    } catch (err) {
        console.error("Error fetching users:", err.message);
        throw err;
    }
};
app.get("/", (req, res) => {
    res.send("Hello, this is the root path!");
});
// Endpoint to get users
app.get("/users", async (req, res) => {
    try {
        console.log("Request received for /users"); // Add this line for logging
        const users = await getUsers();
        console.log("Users fetched successfully:", users); // Add this line for logging
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err); // Add this line for logging
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get users
// app.get("/users", async (req, res) => {
//     try {
//         const users = await getUsers();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
