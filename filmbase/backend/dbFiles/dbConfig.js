const config = {
    user: "kaszkiel",
    password: "michal",
    server: "localhost", // Double backslashes for the instance name
    database: "tutorial",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: "SQLEXPRESS",
    },
    port: 1433,
};

module.exports = config;
