import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useUserStore = create((set) => ({
  billingHistory: [],
  isGettingBillingHistory: false,
  isPlacingOrder: false,
  myOrders: [],
  isGettingMyOrders: false,

  getMyOrders: async () => {
    set({ isGettingMyOrders: true });
    try {
      const res = await axiosInstance.get("/user/order-history");
      set({ myOrders: res.data });
    } catch (error) {
      console.log("Error in getMyOrders", error);
    } finally {
      set({ isGettingMyOrders: false });
    }
  },

  getBillingHistory: async () => {
    set({ isGettingBillingHistory: true });
    try {
      const res = await axiosInstance.get("/user/billing-history");
      set({ billingHistory: res.data });
    } catch (error) {
      console.log("Error in getBillingHistory", error);
    } finally {
      set({ isGettingBillingHistory: false });
    }
  },

  placeOrder: async (data) => {
    set({ isPlacingOrder: true });
    try {
      const res = await axiosInstance.post("/user/place-order", data);
      return res.data;
    } catch (error) {
      console.log("Error in placeOrder", error);
    } finally {
      toast.success("Order placed successfully");
      set({ isPlacingOrder: false });
    }
  },
}));
