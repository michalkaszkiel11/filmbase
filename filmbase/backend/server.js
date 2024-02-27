// const express = require("express"),
//     dbOperations = require("./dbFiles/dbOperations"),
//     cors = require("cors");

// dbOperations.getEmployees().then((res) => {
//     console.log(res);
// });

const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Server configuration
const config = {
    user: "kaszkiel",
    password: "michal",
    server: "localhost",
    database: "tutorial",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: false,
        instance: "SQLEXPRESS",
    },
    port: 1433,
};

const getUsers = async () => {
    try {
        console.log("attempting to get users");
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .query("SELECT * FROM EmployeeDemographics");
        console.log("Connected to the database!");
        console.log(result);
        return result;
    } catch (err) {
        console.error("Error fetching users:", err.message);
        throw err;
    }
};

// Example route to get users
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
        console.log(users);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
