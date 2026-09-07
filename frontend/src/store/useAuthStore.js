import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      const user = res.data;
      set({ authUser: user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      const user = res.data;
      set({ authUser: user });
      get().connectSocket();

      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signUp", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = res.data;
      set({ authUser: user });
      get().connectSocket();

      toast.success("Logged In");
    } catch (error) {
      console.log("Error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged Out");
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("https://fansign-46gd.onrender.com", {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
