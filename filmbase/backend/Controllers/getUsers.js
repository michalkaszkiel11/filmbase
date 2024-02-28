const config = require("../dbFiles/dbConfig");
const mssql = require("mssql");

const getUsers = async () => {
    try {
        console.log("Attempting to get users");
        const pool = await mssql.connect(config);
        const result = await pool.request().query("SELECT * FROM UsersList");
        console.log("Connected to the database!");
        return result; // Returning the recordset
    } catch (err) {
        console.error("Error fetching users:", err.message);
        throw err;
    }
};
module.exports = { getUsers };
