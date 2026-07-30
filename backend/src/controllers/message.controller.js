import cloudinary from "../lib/cloudinary.js";
import { getIo, getReceiverSocketId } from "../lib/socket.js";
import { mongoIdSchema, sendMessageSchema } from "../lib/validations.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const extractPublicId = (url) => {
  if (!url) return null;
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  return parts[1].replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password",
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi trong getUsersForSidebar:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const paramResult = mongoIdSchema.safeParse(req.params.userId);
    if (!paramResult.success) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    const { userId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { receiverId: userId, senderId: myId },
        { receiverId: myId, senderId: userId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Lỗi trong getMessages:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const bodyResult = sendMessageSchema.safeParse(req.body);
    if (!bodyResult.success) {
      return res
        .status(400)
        .json({ message: bodyResult.error.issues[0].message });
    }

    const paramResult = mongoIdSchema.safeParse(req.params.userId);
    if (!paramResult.success) {
      return res.status(400).json({ message: "ID người nhận không hợp lệ" });
    }

    const { text, image } = bodyResult.data;
    const { userId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "5-mern-socketio-realtime-chat/messages",
      });
      imageUrl = uploadResult.secure_url;
    }

    const newMessage = new Message({
      image: imageUrl,
      receiverId: userId,
      senderId,
      text: text || "",
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      getIo().to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Lỗi trong sendMessage:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const paramResult = mongoIdSchema.safeParse(req.params.messageId);
    if (!paramResult.success) {
      return res.status(400).json({ message: "ID tin nhắn không hợp lệ" });
    }

    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Tin nhắn không tồn tại" });
    }

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Không có quyền xóa tin nhắn này" });
    }

    const publicId = extractPublicId(message.image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ message: "Đã xóa tin nhắn" });
  } catch (error) {
    console.error("Lỗi trong deleteMessage:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
