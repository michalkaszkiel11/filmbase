const express = require("express"),
    dbOperation = require("./dbFiles/dbOperations"),
    cors = require("cors");

dbOperation.getEmployees().then((res) => {
    console.log(res);
});

// const API_PORT = process.env.PORT || 5000;
// const app = express();

// let client;
// let session;

// app.use(cors());
// app.get("/api", function (req, res) {
//     console.log("call");
//     res.send({ result: "block" });
// });
// app.listen(API_PORT, () => {
//     console.log("listening on port " + API_PORT);
// });
