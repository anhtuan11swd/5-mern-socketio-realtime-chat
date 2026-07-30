import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    receiverId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    senderId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
