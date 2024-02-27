const express = require("express"),
    dbOperations = require("./dbFiles/dbOperations"),
    cors = require("cors");

dbOperations.getEmployees().then((res) => {
    console.log(res);
});
