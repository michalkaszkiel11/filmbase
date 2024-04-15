const express = require("express");
const jwt = require("jsonwebtoken");
const {
    createUser,
    loginUser,
    changePassword,
    changeEmail,
    getUserInfo,
    updateWatched,
    deleteAccount,
} = require("./Controllers/userController");
const { getUsers } = require("./Controllers/getUsers");
const { authenticateToken } = require("./middleware/authentication");

const router = express.Router();
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
    try {
        const newUser = await createUser(req.body);

        console.log("User created successfully:", newUser);
        res.json(newUser);
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/users/info", authenticateToken, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userInfo = await getUserInfo(userEmail);
        res.json(userInfo);
    } catch (err) {
        console.error("Error retrieving user info:", err.message);
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
                    email: user.email,
                    userId: user.userId,
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
router.post("/users/change-password", async (req, res) => {
    try {
        const { userId, oldPass, newPass } = req.body;
        const result = await changePassword(userId, oldPass, newPass);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error.message);
        if (error.message === "passwords do not match") {
            res.status(401).json({ error: "Passwords do not match" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

router.post("/users/change-email", changeEmail);

router.post("/users/delete-account", deleteAccount);

router.patch("/users/update-watched", updateWatched);
module.exports = router;
