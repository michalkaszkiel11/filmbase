const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    watched: [{ type: String }],
    imdbRating: [{ type: String }],
    userRating: [{ type: String }],
    runtime: [{ type: String }],
});
const UserModel = model("User", UserSchema);

module.exports = UserModel;
