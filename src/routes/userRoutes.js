const { registerUser, loginUser } = require("../controllers/userController");
const { adminAuth, auth } = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.get("/profile", auth, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

router.get("/admin", auth, adminAuth, (req, res) => {
  res.json({ message: "This is admin data, only visible to admins" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
