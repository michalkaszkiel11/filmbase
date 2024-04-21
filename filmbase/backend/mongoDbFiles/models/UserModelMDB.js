const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    watched: [
        {
            Title: String,
            Actors: String,
            Plot: String,
            Awards: String,
            imdbRating: String,
            Runtime: String,
            userRating: Number,
            Poster: String,
        },
    ],
});
const UserModel = model("User", UserSchema);

module.exports = UserModel;
