// const bcrypt = require("bcrypt");
// const { createUserQuery, checkUserQuery } = require("../dbFiles/userQueries");
// const { queryDatabase } = require("../dbFiles/dbUtils");
const UserModel = require("../mongoDbFiles/models/UserModelMDB");
// const jwt = require("jsonwebtoken");
// const { User } = require("../../src/User/User");
const bcrypt = require("bcrypt");
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

// Initialize Supabase client

const supabaseUrl = "https://aykjzzapcctedmrtukqn.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5a2p6emFwY2N0ZWRtcnR1a3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NTYwODYsImV4cCI6MjAyOTUzMjA4Nn0.gR0Z3iT6hL9i-KP8W_x9L_1eNKpGxhxCDfYFlEr6i54";
const supabase = createClient(supabaseUrl, supabaseKey);

const createUser = async (req, res) => {
    try {
        const user = req.body;

        // Check if the user already exists
        const { data: existingUser, error: existingUserError } = await supabase
            .from("UsersList")
            .select("*")
            .eq("email", user.email)
            .single();

        if (existingUserError) {
            throw existingUserError;
        }

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;

        // Insert the user into the database
        const { data: insertedUser, error: insertedUserError } = await supabase
            .from("UsersList")
            .insert(user);

        if (insertedUserError) {
            throw insertedUserError;
        }

        res.json(insertedUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// const createUser = async (req, res) => {
//     try {
//         const user = req.body;

//         // Check if the user already exists
//         const existingUser = await queryDatabase(checkUserQuery(user));
//         const existingUserMDB = await UserModel.findOne({ email: user.email });
//         if (existingUser.length > 0) {
//             throw new Error("User already exists");
//         }

//         // Hash the password before storing it
//         const hashedPassword = await bcrypt.hash(user.password, 12);
//         user.password = hashedPassword;

//         // Insert the user into the database
//         const insertedUser = await queryDatabase(createUserQuery(user));
//         if (!existingUserMDB) {
//             const newUser = await UserModel.create({
//                 email: user.email,
//                 watched: user.watched,
//                 imdbRating: user.imdbRating,
//                 userRating: user.userRating,
//                 runtime: user.runtime,
//             });
//             res.json(newUser);
//         }
//         res.json(insertedUser);
//     } catch (err) {
//         console.error("Error creating user:", err.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const getUserInfo = async (req, res) => {
    try {
        const email = req.user.email;

        // Fetch user data from Supabase
        const { data: user, error } = await supabase
            .from("UsersList")
            .select("*")
            .eq("email", email)
            .single();

        if (error) {
            throw error;
        }

        // If no user found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user info:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// const getUserInfo = async (req, res) => {
//     try {
//         const email = req.user.email;

//         const result = await queryDatabase(
//             `SELECT * FROM UsersList WHERE email = '${email}'`
//         );
//         const userMDB = await UserModel.find({ email: email });

//         if (result.length === 0) {
//             return null;
//         }
//         const user = result[0];
//         if (user) {
//             res.json(user);
//         }
//         if (userMDB) {
//             return userMDB;
//         }
//     } catch (err) {
//         console.error("Error retrieving user info:", err.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user data from the database
        const { data: user, error: userError } = await supabase
            .from("UsersList")
            .select("*")
            .eq("email", email)
            .single();

        if (userError) {
            throw userError;
        }

        // If no user found or passwords don't match
        if (!user || !(await bcrypt.compare(password, user.pass))) {
            return res.status(401).json({
                message: "Combination email/password does not exist",
            });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "45m",
        });

        // Include additional user data like userName in the response
        res.cookie("jwtToken", token, { httpOnly: true, secure: true })
            .status(200)
            .json({
                token,
                userName: user.userName,
                email: user.email,
                userId: user.userId,
            });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Fetch user data from the database
//         const result = await queryDatabase(
//             `SELECT * FROM UsersList WHERE email = '${email}'`
//         );
//         // If no user found
//         if (result.length === 0) {
//             return null;
//         }
//         // Extract user data from the query
//         const user = result[0];
//         const passwordMatch = await bcrypt.compare(password, user.pass);

//         // If passwords match, return the user data
//         if (passwordMatch) {
//             const token = jwt.sign(
//                 { email: user.email },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "45m" }
//             );

//             // Include additional user data like userName in the response
//             res.cookie("jwtToken", token, { httpOnly: true, secure: true })
//                 .status(200)
//                 .json({
//                     token,
//                     userName: user.userName,
//                     email: user.email,
//                     userId: user.userId,
//                 });
//         } else {
//             res.status(401).json({
//                 message: "Combination email/password does not exist",
//             });
//         }
//     } catch (error) {
//         console.error("Error logging in:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const getUserById = async (userId) => {
    try {
        // Fetch user data from Supabase based on userId
        const { data: user, error } = await supabase
            .from("UsersList")
            .select("*")
            .eq("userId", userId)
            .single();

        if (error) {
            throw error;
        }

        // If no user found
        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        throw error;
    }
};

// const getUserById = async (userId) => {
//     try {
//         const query = `SELECT * FROM UsersList WHERE userId = '${userId}'`;
//         const user = await queryDatabase(query);

//         if (user.length === 0) {
//             return null;
//         }

//         return user[0];
//     } catch (error) {
//         console.error("Error fetching user by ID:", error.message);
//         throw error;
//     }
// };
const changePassword = async (req, res) => {
    try {
        const { userId, oldPass, newPass } = req.body;

        // Fetch user data from Supabase
        const { data: user, error } = await supabase
            .from("UsersList")
            .select("*")
            .eq("userId", userId)
            .single();

        if (error) {
            throw error;
        }

        // If no user found
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(oldPass, user.pass);
        if (oldPass === newPass) {
            throw new Error("New password is the same as old password");
        }

        if (passwordMatch) {
            const hashedPassword = await bcrypt.hash(newPass, 12);
            // Update user password in Supabase
            await supabase
                .from("UsersList")
                .update({ pass: hashedPassword })
                .eq("userId", userId);

            res.status(200).json({
                message: "Password changed successfully",
            });
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// const changePassword = async (req, res) => {
//     try {
//         const { userId, oldPass, newPass } = req.body;

//         const result = await queryDatabase(
//             `SELECT * FROM UsersList WHERE userId = '${userId}'`
//         );

//         // Check if any rows were returned
//         if (result.length === 0) {
//             throw new Error("User not found");
//         }
//         const user = result[0];

//         const passwordMatch = await bcrypt.compare(oldPass, user.pass);
//         if (oldPass === newPass) {
//             throw new Error("New password is the same as old password");
//         }

//         if (passwordMatch) {
//             const hashedPassword = await bcrypt.hash(newPass, 12);
//             const updateQuery = `UPDATE UsersList SET pass = '${hashedPassword}' WHERE userId = '${userId}'`;
//             const updateResult = await queryDatabase(updateQuery); // Renamed result variable to updateResult
//             res.status(200).json({
//                 message: "Password changed successfully",
//                 updateResult,
//             });
//         } else {
//             throw new Error("Password does not match");
//         }
//     } catch (err) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const changeEmail = async (req, res) => {
    try {
        const { email, newEmail } = req.body;
        // Update user email in Supabase
        const { error: updateError } = await supabase
            .from("UsersList")
            .update({ email: newEmail })
            .eq("email", email);

        if (updateError) {
            throw updateError;
        }

        // If email update was successful
        res.status(200).json({
            message: "E-mail changed successfully",
        });
    } catch (err) {
        console.error("Error changing email:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// const changeEmail = async (req, res) => {
//     try {
//         const { email, newEmail } = req.body;
//         const updateQuery = `UPDATE UsersList SET email = '${newEmail}' WHERE email = '${email}'`;
//         const updateMDB = await UserModel.findOneAndUpdate(
//             { email: email },
//             { $set: { email: newEmail } },
//             { new: true }
//         );
//         const result = await queryDatabase(updateQuery);
//         res.status(200).json({
//             message: "E-mail changed successfully",
//             result,
//             updateMDB,
//         });
//     } catch (err) {
//         console.error("Error changing email:", err.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const deleteAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user data from Supabase
        const { data: user, error: fetchError } = await supabase
            .from("UsersList")
            .select("*")
            .eq("email", email)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        // If no user found
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.pass);

        if (passwordMatch) {
            // Delete user from Supabase
            const { error: deleteError } = await supabase
                .from("UsersList")
                .delete()
                .eq("email", email);

            if (deleteError) {
                throw deleteError;
            }

            // If deletion was successful
            res.status(200).json({
                message: "Account deleted successfully",
            });
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        console.error("Error deleting account:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// const deleteAccount = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const result = await queryDatabase(
//             `SELECT * FROM UsersList WHERE email = '${email}'`
//         );
//         if (result.length === 0) {
//             throw new Error("User not found");
//         }

//         const user = result[0];
//         const passwordMatch = await bcrypt.compare(password, user.pass);

//         if (passwordMatch) {
//             const deleteAccountQuery = `DELETE FROM UsersList WHERE email = '${email}'`;
//             const resultMDB = await UserModel.findOneAndDelete({
//                 email: email,
//             });

//             const deletion = await queryDatabase(deleteAccountQuery);
//             res.status(200).json({
//                 message: "Account deleted successfully",
//                 deletion,
//                 resultMDB,
//             });
//         } else {
//             throw new Error("Password does not match");
//         }
//     } catch (err) {
//         console.error("Error deleting account:", err.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const updateWatched = async (req, res) => {
    console.log("update started");

    try {
        const { email } = req.body;
        const updatedWatched = req.body.watched;

        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { $push: { watched: updatedWatched } }, // Add the new watched data to the watched array
            { new: true } // Return the updated document
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
    getUserById,
    changeEmail,
    changePassword,
    deleteAccount,
    updateWatched,
    getWatched,
    updateUserRating,
    deleteMovie,
};
