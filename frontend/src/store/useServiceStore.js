import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useServiceStore = create((set) => ({
  allServices: [],
  forYouServices: [],
  singleService: null,
  isGettingServices: false,
  isGettingForYouServices: false,
  isGettingSingleService: false,

  forYou: async () => {
    set({ isGettingForYouServices: true });
    try {
      const res = await axiosInstance.get("/utils/for-you");
      console.log(res.data);
      set({ forYouServices: res.data });
    } catch (error) {
      console.log("Error in forYou", error);
    } finally {
      set({ isGettingForYouServices: false });
    }
  },

  //search service
  searchServices: async ({ category = "", search = "" }) => {
    set({ isGettingServices: true });
    try {
      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (search) query.append("search", search);

      const res = await axiosInstance.get(
        `/utils/search-services?${query.toString()}`
      );
      set({ allServices: res.data });
    } catch (error) {
      console.log("Error in searchServices", error);
    } finally {
      set({ isGettingServices: false });
    }
  },

  //single service
  getSingleService: async (id) => {
    set({ isGettingSingleService: true });
    try {
      const res = await axiosInstance.get(`/utils/service/${id}`);
      set({ singleService: res.data });
    } catch (error) {
      console.log("Error in getSingleService", error);
    } finally {
      set({ isGettingSingleService: false });
    }
  },
}));
