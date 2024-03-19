const config = require("../dbFiles/dbConfig");
const mssql = require("mssql");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
    try {
        let pool = await mssql.connect(config);
        const checkUserQuery = `SELECT * FROM UsersList WHERE userId = '${user.userId}' OR email = '${user.email}'`;
        const existingUser = await pool.request().query(checkUserQuery);

        if (existingUser.recordset.length > 0) {
            throw new Error("User already exists");
        }
        const insertUserQuery = `
        INSERT INTO UsersList (userId, userName, email, pass)
        VALUES ('${user.userId}', '${user.userName}', '${user.email}', '${user.pass}')
    `;
        const insertedUser = await pool.request().query(insertUserQuery);

        return insertedUser;
    } catch (err) {
        console.error(err);
        throw err; // re-throw the error to handle it in the calling function
    }
};
const loginUser = async (email, password) => {
    try {
        let pool = await mssql.connect(config);
        // Query the db
        const query = `SELECT * FROM UsersList WHERE email = '${email}'`;
        const result = await pool.request().query(query);

        // If no user found
        if (result.recordset.length === 0) {
            return null;
        }

        // Extract user data from the query
        const user = result.recordset[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.pass);

        // If passwords match, return the user data
        if (passwordMatch) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};

module.exports = { createUser, loginUser };
