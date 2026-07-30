import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import {
  loginSchema,
  signupSchema,
  updateProfileSchema,
} from "../lib/validations.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const { fullName, email, password } = result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Lỗi trong signup:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không hợp lệ" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không hợp lệ" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Lỗi trong login:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

const extractPublicId = (url) => {
  if (!url) return null;
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  return parts[1].replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
};

export const updateProfile = async (req, res) => {
  try {
    const result = updateProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const { profilePic } = result.data;

    const oldPublicId = extractPublicId(req.user.profilePic);
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const uploadResult = await cloudinary.uploader.upload(profilePic, {
      folder: "5-mern-socketio-realtime-chat/profiles",
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: uploadResult.secure_url },
      { new: true },
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Lỗi trong updateProfile:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Lỗi trong checkAuth:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const logout = (_req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Lỗi trong logout:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
