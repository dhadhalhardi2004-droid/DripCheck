const express = require("express");
const router = express.Router();

const { register, login, sendOtp, forgotPasswordOtp, resetPassword } = require("../controllers/authController");

router.post("/send-otp", sendOtp);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password-otp", forgotPasswordOtp);
router.post("/reset-password", resetPassword);

module.exports = router;