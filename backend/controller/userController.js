import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

dotenv.config();

const registerUsers = async (req, res) => {
    const { name, email, password } = req.body;
    const allowedKeys = ['name', 'email', 'password'];
    const keys = Object.keys(req.body);
    const invalidKeys = keys.filter((key) => !allowedKeys.includes(key));

    if (invalidKeys.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Invalid fields: ${invalidKeys.join(', ')}`,
        });
    }
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ success: false, message: "Name is required and must be a string" });
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ success: false, message: "Email is required and must be a string" });
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ success: false, message: "Password is required and must be a string" });
    }
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, message: "User Registered Successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to register user", error });
    }

}

const loginUsers = async (req, res) => {
    const { email, password } = req.body;
    const allowedKeys = ['email', 'password'];
    const keys = Object.keys(req.body);
    const invalidKeys = keys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Invalid fields: ${invalidKeys.join(', ')}`,
        });
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ success: false, message: "Email is required and must be a string" });
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ success: false, message: "Password is required and must be a string" });
    }
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            const userPlain = user.toJSON();
            const { password: _, refresh_token: __, ...SafeUserData } = userPlain;
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });
                 res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                res.status(200).json({ success: true, message: "User Logged In Successfully", accessToken, refreshToken, user: SafeUserData });
            } else {
                res.status(401).json({ success: false, message: "Incorrect Password" });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to login user", error });

    }

}


const logoutUsers = async (req, res) => {
    try {
        console.log("🍪 Checking cookies:", req.cookies);

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            console.warn("⚠️ No refreshToken found in cookies");
            return res.status(401).json({
                success: false,
                message: "refreshToken not found in cookies",
            });
        }

        const user = await User.findOne({ where: { refresh_token: refreshToken } });

        if (!user) {
            console.warn("⚠️ User not found with that refreshToken");
            return res.status(401).json({
                success: false,
                message: "User with given refreshToken not found",
            });
        }

        if (!user.refresh_token) {
            console.warn("⚠️ User exists but has no refresh_token stored");
            return res.status(401).json({
                success: false,
                message: "User does not have refresh token in DB",
            });
        }

        const userId = user.id;

        await User.update({ refresh_token: null }, { where: { id: userId } });
        res.clearCookie("refreshToken");
        console.log("✅ Logout successful for user ID:", userId);

        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully"
        });

    } catch (error) {
        console.error("❌ Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to logout user",
            error: error.message,
        });
    }
};



export { registerUsers, loginUsers, logoutUsers };