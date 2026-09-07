import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  // users
  allUsers: [],
  isGettingUsers: false,

  // orders
  allOrders: [],
  isGettingOrders: false,
  isMarkingOrderComplete: false,

  getAllOrders: async () => {
    set({ isGettingOrders: true });
    try {
      const res = await axiosInstance.get("/admin/get-all-orders");
      console.log(res.data);
      set({ allOrders: res.data });
    } catch (error) {
      console.log("Error in getting all orders", error);
    } finally {
      set({ isGettingOrders: false });
    }
  },

  markOrder: async (id) => {
    set({ isMarkingOrderComplete: true });
    try {
      const res = await axiosInstance.post(`/admin/mark-order/${id}`);
      const updatedOrder = res.data;

      toast.success("Order marked as complete");

      // Update Zustand state
      set((state) => ({
        allOrders: state.allOrders.map((order) =>
          order._id === id ? updatedOrder : order
        ),
      }));
    } catch (error) {
      console.log("Error in marking order complete", error);
      toast.error("Failed to mark as complete");
    } finally {
      set({ isMarkingOrderComplete: false });
    }
  },

  // create service
  isCreatingService: false,
  uploadService: async (data) => {
    set({ isCreatingService: true });
    try {
      const res = await axiosInstance.post("/admin/create-service", data);
      console.log(res.data);
      toast.success("Service created successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in uploading service", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isCreatingService: false });
    }
  },

  //category
  isGettingCategories: false,
  isEditingCategory: false,
  isDeletingCategory: false,
  allCategories: [],

  getAllCategories: async () => {
    set({ isGettingCategories: true });
    try {
      const res = await axiosInstance.get("/admin/get-categories");
      console.log(res.data);
      set({ allCategories: res.data });
    } catch (error) {
      console.log("Error in getting categories", error);
    } finally {
      set({ isGettingCategories: false });
    }
  },
  createCategory: async (data) => {
    set({ isCreatingCategory: true });
    try {
      const res = await axiosInstance.post("/admin/create-category", data);
      console.log(res.data);
      toast.success("Category created successfully");
      set((state) => ({
        allCategories: [res.data, ...state.allCategories],
      }));
    } catch (error) {
      console.log("Error in creating category", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  editCategory: async (data) => {
    set({ isEditingCategory: true });
    try {
      const res = await axiosInstance.post(
        `/admin/edit-category/${data._id}`,
        data
      );
      console.log(res.data);
      toast.success("Category edited successfully");
      set((state) => ({
        allCategories: state.allCategories.map((category) =>
          category._id === res.data._id ? res.data : category
        ),
      }));
    } catch (error) {
      console.log("Error in editing category", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isEditingCategory: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isDeletingCategory: true });
    try {
      const res = await axiosInstance.delete(`/admin/delete-category/${id}`);
      console.log(res.data);
      toast.success("Category deleted successfully");
      set((state) => ({
        allCategories: state.allCategories.filter(
          (category) => category._id !== id
        ),
      }));
    } catch (error) {
      console.log("Error in deleting category", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isDeletingCategory: false });
    }
  },
}));
