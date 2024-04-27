const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors());
// app.use(
//     cors({
//         origin: "*", // Allow all origins * = wildcard
//         methods: ["HEAD", "GET", "POST", "PATCH", "DELETE"],
//         credentials: true,
//     })
// );
app.use(express.json());
app.use("/api", router);

// MongoDB configuration
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    )
    .then(() => {
        console.log("MongoDB connected! 😃");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// SQL database configuration

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
