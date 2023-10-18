import { create } from "zustand";

export const useResturantStore = create((set) => ({
    resturants: [],
    setResturants: (payload: any) => set({ resturants: payload })
}));
