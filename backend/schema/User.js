const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		required: true,
		type: String,
		immutable: true,
	},
	password: {
		required: true,
		type: String,
	},
});

module.exports = mongoose.model("user", UserSchema);
