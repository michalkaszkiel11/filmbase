const config = require("../dbFiles/dbConfig");
const mssql = require("mssql");

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
module.exports = { createUser };
