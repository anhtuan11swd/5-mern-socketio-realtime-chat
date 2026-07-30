import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development" ? "http://localhost:5001" : "");

export const useAuthStore = create((set, get) => ({
  authUser: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/check");
      set({ authUser: res.data });
      get().connectSocket(res.data._id);
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  connectSocket: (userId) => {
    const { socket } = get();
    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      query: { userId },
    });
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ onlineUsers: [], socket: null });
  },
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket(res.data._id);
      toast.success("Đăng nhập thành công");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại";
      toast.error(message);
      return { message, success: false };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      get().disconnectSocket();
      await axiosInstance.post("/api/v1/auth/logout");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng xuất thất bại");
    }
  },
  onlineUsers: [],

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/api/v1/auth/signup", data);
      await axiosInstance.post("/api/v1/auth/logout");
      toast.success("Đăng ký thành công");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(message);
      return { message, success: false };
    } finally {
      set({ isSigningUp: false });
    }
  },
  socket: null,

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/api/v1/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Cập nhật thành công");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Cập nhật thất bại";
      toast.error(message);
      return { message, success: false };
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
