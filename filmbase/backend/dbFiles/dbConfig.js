const config = {
    user: "michal",
    password: "mis",
    server: "MSI",
    database: "SQL tutorial",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        // instancename: "SQLEXPRESS",
    },
    port: 1433,
};
module.exports = config;
