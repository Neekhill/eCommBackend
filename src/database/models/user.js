const mongoose = require("mongoose");
const userSchema = require("../schema/user");

const Users = mongoose.model("Todos", userSchema);

module.exports = Users;
