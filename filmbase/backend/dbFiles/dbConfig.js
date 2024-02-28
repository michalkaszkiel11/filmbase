const config = {
    user: "mk11",
    password: "mk11",
    server: `MSI\\MICHALKASZKIEL`,
    database: "SQL Users", // Change this to your specific database name
    options: {
        trustedConnection: true,
        encrypt: false, // Disable encryption
    },
    port: 1434,
};
module.exports = config;
