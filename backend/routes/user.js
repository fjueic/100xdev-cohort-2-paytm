const express = require("express");
const userSchema = require("../schema/User.js");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth.js");
const zod = require("zod");

let router = express.Router();

router.use(authMiddleware);

const schema = zod.object({
	name: zod.string().min(3).max(50).optional(),
	password: zod.string().min(6).optional(),
	newPassword: zod.string().min(6).optional(),
});

router.patch("/", async (req, res) => {
	let user = req.user;
	const { success } = schema.safeParse(req.body);
	if (!success) {
		res.status(400).send("Invalid data");
		return;
	}
	let { name, password, newPassword } = req.body;
	user = await userSchema.findOne({ email: user.email });
	if (bcrypt.compareSync(password, user.password)) {
		if (newPassword) {
			user.password = bcrypt.hashSync(newPassword, 11);
		}
		if (name) {
			user.name = name;
		}
		await user.save();
		res.json({
			message: "Information updated successfully",
		});
	} else {
		res.status(401).json({
			message: "Wrong password",
		});
	}

	user;
});
router.get("/bulk", async (req, res) => {
	let { filter } = req.query;
    if(!filter){
        filter = ""
    }
	let users = await userSchema.find({
		$or: [{ name: { $regex: filter } }, { email: { $regex: filter } }],
	});
	res.json({
		user: users.map((user) => ({
			name: user.name,
			email: user.email,
            _id: user._id,
		})),
	});
});

module.exports = router;
