const bcrypt = require("bcrypt");
const { queryDatabase } = require("../dbFiles/dbUtils");
const UserModel = require("../mongoDbFiles/models/UserModelMDB");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
    try {
        const user = req.body;

        // Check if the user already exists

        const existingUserMDB = await UserModel.findOne({ email: user.email });

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;

        // Insert the user into the database
        if (!existingUserMDB) {
            const newUser = await UserModel.create({
                email: user.email,
                userName: user.userName,
                pass: user.password,
                watched: user.watched,
                imdbRating: user.imdbRating,
                userRating: user.userRating,
                runtime: user.runtime,
            });
            res.json(newUser);
        }
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const email = req.user.email;

        const userMDB = await UserModel.findOne({ email: email });
        if (!userMDB) {
            throw new Error("Couldn't find user");
        }
        return userMDB;
    } catch (err) {
        console.error("Error retrieving user info:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: email });

        // If no user found with the provided email
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.pass);

        if (passwordMatch) {
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "45m" }
            );

            // Include user data like userName in the response
            res.cookie("jwtToken", token, { httpOnly: true, secure: true })
                .status(200)
                .json({
                    token,
                    userName: user.userName,
                    email: user.email,
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
};

const changePassword = async (req, res) => {
    try {
        const { email, oldPass, newPass } = req.body;
        const user = await UserModel.findOne({ email: email });
        const passwordMatch = await bcrypt.compare(oldPass, user.pass);

        // Check if the new password is the same as the old password
        if (oldPass === newPass) {
            throw new Error("New password is the same as old password");
        }

        if (passwordMatch) {
            // Hash the new password before updating it in the database
            const hashedPassword = await bcrypt.hash(newPass, 12);
            // Update the password field in the database
            const updatedUser = await UserModel.findOneAndUpdate(
                { email: email },
                { $set: { pass: hashedPassword } },
                { new: true }
            );
            res.status(200).json({
                message: "Password changed successfully",
                updatedUser: updatedUser,
            });
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const changeEmail = async (req, res) => {
    try {
        const { email, newEmail } = req.body;

        // Update email in MongoDB
        const updateMDB = await UserModel.findOneAndUpdate(
            { email: email },
            { $set: { email: newEmail } },
            { new: true }
        );

        res.status(200).json({
            message: "E-mail changed successfully",
            updateMDB,
        });
    } catch (err) {
        console.error("Error changing email:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in MongoDB
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.pass);

        if (passwordMatch) {
            // Delete account from MongoDB
            const resultMDB = await UserModel.findOneAndDelete({
                email: email,
            });

            res.status(200).json({
                message: "Account deleted successfully",
                resultMDB,
            });
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        console.error("Error deleting account:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateWatched = async (req, res) => {
    console.log("update started");

    try {
        const { email } = req.body;
        const updatedWatched = req.body.watched;

        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { $push: { watched: updatedWatched } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }
        console.log("updateWatched finish");

        res.status(200).json(user);
    } catch (err) {
        console.error("Error updating watched:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
const updateUserRating = async (req, res) => {
    const { email, _id, userRating } = req.body;
    try {
        const updatedMovie = await UserModel.findOneAndUpdate(
            { email: email, "watched._id": _id },
            { $set: { "watched.$.userRating": userRating } },
            { new: true }
        );
        if (!updatedMovie) {
            console.log("Movie not found");
            return res.status(404).json({ message: "Movie not found" });
        }
        console.log("Movie updated successfully:", updatedMovie);
        return res.status(200).json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
const deleteMovie = async (req, res) => {
    const { email, _id } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: email },
            { $pull: { watched: { _id: _id } } },
            { new: true }
        );
        if (!updatedUser) {
            return res
                .status(500)
                .json({ message: "Failed to delete the movie" });
        }
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getWatched = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send("Not found");
        }
        res.status(200).json({
            message: "Watched data retrieved successfully",
            user,
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    createUser,
    getUserInfo,
    loginUser,
    changeEmail,
    changePassword,
    deleteAccount,
    updateWatched,
    getWatched,
    updateUserRating,
    deleteMovie,
};
