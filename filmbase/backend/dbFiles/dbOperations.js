const config = require("./dbConfig"),
    sql = require("mssql");

const getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = pool
            .request()
            .query("SELECT * from EmployeeDemographics");
        console.log(employees);
        return employees;
    } catch (err) {
        console.error(err);
    }
};
module.exports = { getEmployees };
