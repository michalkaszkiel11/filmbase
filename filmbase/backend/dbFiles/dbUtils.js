const mssql = require("mssql");
const config = require("./dbConfig");

const queryDatabase = async (query) => {
    try {
        let pool = await mssql.connect(config);
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (error) {
        console.error("Database query error:", error.message);
        throw error;
    } finally {
        await mssql.close();
    }
};

module.exports = { queryDatabase };
