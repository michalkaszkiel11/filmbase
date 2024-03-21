const bcrypt = require("bcrypt");
const { createUserQuery, checkUserQuery } = require("../dbFiles/userQueries");
const { queryDatabase } = require("../dbFiles/dbUtils");

const createUser = async (user) => {
    try {
        // Check if the user already exists
        const existingUser = await queryDatabase(checkUserQuery(user));

        if (existingUser.length > 0) {
            throw new Error("User already exists");
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;

        // Insert the user into the database
        const insertedUser = await queryDatabase(createUserQuery(user));

        return insertedUser;
    } catch (err) {
        console.error("Error creating user:", err.message);
        throw err;
    }
};

const loginUser = async (email, password) => {
    try {
        // Fetch user data from the database
        const result = await queryDatabase(
            `SELECT * FROM UsersList WHERE email = '${email}'`
        );

        // If no user found
        if (result.length === 0) {
            return null;
        }

        // Extract user data from the query
        const user = result[0];

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
const getUserById = async (userId) => {
    try {
        const query = `SELECT * FROM UsersList WHERE userId = '${userId}'`;
        const user = await queryDatabase(query);

        if (user.length === 0) {
            return null;
        }

        return user[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        throw error;
    }
};
module.exports = { createUser, loginUser, getUserById };
