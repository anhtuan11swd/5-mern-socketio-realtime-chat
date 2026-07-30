import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/check");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
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
      await axiosInstance.post("/api/v1/auth/logout");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng xuất thất bại");
    }
  },

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
