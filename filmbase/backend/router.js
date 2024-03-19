const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { getUsers } = require("./Controllers/getUsers");
const { createUser, loginUser } = require("./Controllers/userController");
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
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUserMocker = new User(
        req.body.userId,
        req.body.userName,
        req.body.email,
        hashedPassword
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
router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);
        // If loginUser function returns user data, generate a JWT token
        if (user) {
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "45m" }
            );
            // Send the token in the response
            res.cookie("jwtToken", token, { httpOnly: true, secure: true })
                .status(200)
                .json({ token });
        } else {
            // If loginUser function returns null, user authentication failed
            res.status(401).json({
                message: "Combination email/password does not exist",
            });
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
