const express = require("express");
const signup = require("./signup");
const signin = require("./signin");
const user = require("./user");
const account = require("./account")

let router = express.Router();

router.use("/signup", signup);
router.use("/signin", signin);
router.use("/user", user);
router.use("/account",account)

module.exports = router;
