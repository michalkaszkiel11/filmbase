const config = require("../dbFiles/dbConfig");
const mssql = require("mssql");

const createUser = async (user) => {
    try {
        let pool = await mssql.connect(config);
        let users = pool.request().query(
            `INSERT INTO UsersList VALUES
                (${user.Id}, '${user.userName}', '${user.email}', '${user.password}')`
        );
        return users;
    } catch (err) {
        console.error(err);
    }
};
module.exports = { createUser };
