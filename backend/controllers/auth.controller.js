import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { redis } from "../config/redis.js";

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(401).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const existedUser = await User.findOne({ email });
    const existedUsername = await User.findOne({ username });

    if (existedUser) {
      return res.status(401).json({ error: "User already exist." });
    }
    if (existedUsername) {
      return res.status(401).json({ error: "User already exist." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser?._id, res);
      await newUser.save();

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(401).json({ error: "Both are required" });
    }

    if (!email) {
      return res.status(401).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }
    const isPassCorrect = await bcrypt.compare(password, user?.password || "");
    if (!isPassCorrect || !user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    generateTokenAndSetCookie(user?._id, res);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
      },
    });

    const recevier = {
      from: '"Fansign" <fansign@gmail.com>',
      to: email,
      subject: "Reset Your Sign Password",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Vault Platform Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .container {
            max-width: 350px;
            margin: 0 auto;
            padding: 14px;
            background-color: #f7f7f7;
        }
        .header {
            background-color: #4a90e2;
            padding: 10px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
        }
        .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello ${user?.username},</p>
            <p>We received a request to reset the password for your Vault account. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, please click the button below:</p>
            <p style="text-align: center;">
                <a target="_blank" href=${`${process.env.CLIENT_URL}/reset-password/${token}`} class="button">Reset Password</a>
            </p>
            <p>This link will expire in 5 Minutes for security reasons. If you need to reset your password after that, please request a new reset link.</p>
            
            <p>If you didn't request a password reset, please contact our support team immediately at coinbase@gmail.com</p>
            <p>Best regards,<br>The Vault Team</p>
        </div>
        <div class="footer">
            <p>&copy; Vault. All rights reserved.</p> 
        </div>
    </div>
</body>
</html>`,
    };

    transporter.sendMail(recevier, (err, info) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong" });
      }

      res.status(200).json({ message: "Email sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "New password are required" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword.trim(), salt);
    user.password = hashPass;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPass, newPass, confirmNewPass } = req.body;
    const userId = req.user?._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!oldPass || !newPass || !confirmNewPass) {
      return res.status(400).json({ error: "Both are required" });
    }

    // Change password
    if (oldPass && newPass) {
      if (oldPass.trim() === newPass.trim()) {
        return res.status(401).json({
          error: "You entered old password. Please try a new password",
        });
      }
      if (newPass.trim() !== confirmNewPass.trim()) {
        return res.status(401).json({
          error: "New password didn't match. Please try again",
        });
      }

      const isPassCorrect = await bcrypt.compare(oldPass.trim(), user.password);
      if (!isPassCorrect) {
        return res.status(401).json({ error: "Incorrect current password" });
      }

      if (newPass.length < 6) {
        return res
          .status(401)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(newPass.trim(), salt);
      user.password = hashPass || user.password;
      user = await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getMe = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  register,
  login,
  logout,
  getMe,
  resetPassword,
  forgotPassword,
  changePassword,
};
