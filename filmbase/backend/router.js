const express = require("express");
const { getUsers } = require("./Controllers/getUsers");
const { createUser } = require("./Controllers/userController");
const router = express.Router();

const User = require("./dbFiles/user");
// const Michal = new User("112AB", "ADIS", "michsadasi@gmail.com", "logo12");

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

router.post("/users/create", async (req, res) => {
    const newUserMocker = new User(
        req.body.userId,
        req.body.userName,
        req.body.email,
        req.body.password
    );
    try {
        const newUser = await createUser(newUserMocker);
        console.log("User created successfully:", newUser);
        res.json(newUser);
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
