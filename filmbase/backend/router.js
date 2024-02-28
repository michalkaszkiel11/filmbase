const express = require("express");
const { getUsers } = require("./Controllers/getUsers");
const { createUser } = require("./Controllers/createUser");
const router = express.Router();

const User = require("./dbFiles/user");
const Michal = new User("112AB", "ADIS", "michsadasi@gmail.com", "logo12");

router.get("/users", async (req, res) => {
    try {
        console.log("Request received for /users");
        const users = await getUsers();
        console.log("Users fetched successfully:", users);
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/users/create", async (req, res) => {
    try {
        const newUser = await createUser(Michal);
        console.log("User created successfully:", newUser);
        res.json(newUser);
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
