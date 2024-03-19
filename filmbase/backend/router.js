const express = require("express");
const jwt = require("jsonwebtoken");
const {
    createUser,
    loginUser,
    // getUserById,
} = require("./Controllers/userController");
// const { authenticateToken } = require("./middleware/authentication");

const router = express.Router();

router.post("/users/create", async (req, res) => {
    try {
        const newUser = await createUser(req.body);
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

        if (user) {
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "45m" }
            );

            // Include additional user data like userName in the response
            res.cookie("jwtToken", token, { httpOnly: true, secure: true })
                .status(200)
                .json({
                    token,
                    userName: user.userName,
                });
        } else {
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
