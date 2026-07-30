import { Router } from "express";
import {
  deleteMessage,
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.post("/send/:userId", protectRoute, sendMessage);
router.get("/:userId", protectRoute, getMessages);
router.delete("/:messageId", protectRoute, deleteMessage);

export default router;
