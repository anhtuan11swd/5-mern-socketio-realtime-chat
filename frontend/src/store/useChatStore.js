import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set) => ({
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/v1/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi tải tin nhắn");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/v1/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi tải danh sách người dùng",
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },
  isMessagesLoading: false,
  isUsersLoading: false,
  messages: [],
  selectedUser: null,

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = useChatStore.getState();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(
        `/api/v1/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Gửi tin nhắn thất bại");
      return { success: false };
    }
  },

  setSelectedUser: (selectedUser) => set({ messages: [], selectedUser }),
  users: [],
}));
