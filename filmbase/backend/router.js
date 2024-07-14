const express = require("express");
const {
    createUser,
    loginUser,
    changePassword,
    changeEmail,
    getUserInfo,
    deleteAccount,
    getWatched,
    updateWatched,
    updateUserRating,
    deleteMovie,
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
router.get("/awake", (req, res) => {
    res.send({ message: "Server is awake!" });
});
router.post("/users/create", createUser);
router.get("/users/info", authenticateToken, getUserInfo);
router.post("/users/login", loginUser);
router.post("/users/change-password", changePassword);
router.post("/users/change-email", changeEmail);
router.post("/users/delete-account", deleteAccount);
router.patch("/users/update-watched", updateWatched);
router.get("/users/getWatched/:email", getWatched);
router.patch("/users/film/update-user-rating", updateUserRating);
router.patch("/users/film/delete-film", deleteMovie);

module.exports = router;
