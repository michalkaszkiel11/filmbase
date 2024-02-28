const config = require("../dbFiles/dbConfig");
const mssql = require("mssql");

const createUser = async (user) => {
    try {
        let pool = await mssql.connect(config);
        let users = await pool.request().query(
            `INSERT INTO UsersList VALUES
                ('${user.userId}', '${user.userName}', '${user.email}', '${user.pass}')`
        );
        return users;
    } catch (err) {
        console.error(err);
    }
};
module.exports = { createUser };
