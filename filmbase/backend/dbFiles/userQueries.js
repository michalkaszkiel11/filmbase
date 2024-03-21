const createUserQuery = (user) => {
    return `
        INSERT INTO UsersList (userId, userName, email, pass)
        VALUES ('${user.userId}', '${user.userName}', '${user.email}', '${user.password}')
    `;
};

const checkUserQuery = (user) => {
    return `SELECT * FROM UsersList WHERE userId = '${user.userId}' OR email = '${user.email}'`;
};

module.exports = { createUserQuery, checkUserQuery };
