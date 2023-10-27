import { create } from "zustand";

export const useResturantStore = create((set) => ({
    resturants: [],
    setResturants: (payload: any) => set({ resturants: payload })
}));
export const useSellerStore = create((set) => ({
    seller: null,
    setSeller: (payload: any) => set({ seller: payload })
}));
