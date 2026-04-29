const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// SEND OTP
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Remove existing OTPs for this email
        await OTP.deleteMany({ email });
        
        await OTP.create({ email, otp: otpCode });
        
        const emailSent = await sendEmail(email, "DripCheck - Your Verification Code", `Your verification code is: ${otpCode}`);
        
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send email. Please check your internet or try again later." });
        }

        res.json({ message: "OTP sent to your email" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, gender, otp } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Verify OTP
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender
        });

        await OTP.deleteMany({ email });

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// FORGOT PASSWORD OTP
exports.forgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({ email });
        await OTP.create({ email, otp: otpCode });
        
        const emailSent = await sendEmail(email, "DripCheck - Reset Password", `Your password reset code is: ${otpCode}`);

        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send reset email. Please try again later." });
        }

        res.json({ message: "Reset OTP sent to your email" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await OTP.deleteMany({ email });

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};