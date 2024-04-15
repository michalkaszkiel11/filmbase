const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    watched: [
        {
            imdbRating: String,
            Runtime: String,
            userRating: Number,
        },
    ],
});
const UserModel = model("User", UserSchema);

module.exports = UserModel;
