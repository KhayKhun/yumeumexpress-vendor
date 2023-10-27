import { create } from "zustand";
import type { foodType } from "../constants/global.types";

export const useFoodStore = create((set) => ({
  foods: [],
  setFoods: (newFoods: foodType[]) => set({ foods: newFoods }),
}));


export const useSelectedFoodStore = create((set) => ({
  selectedFoods: [],
  toggleFood: (food: foodType) =>
    set((state: any) => {
      const id = food.id;
      const selectedFoods = [...state.selectedFoods]; // Create a copy of the selectedFoods array

      const foodIndex = selectedFoods.findIndex((f) => f.id === id);

      if (foodIndex !== -1) {
        if (selectedFoods[foodIndex].count) {
          selectedFoods[foodIndex].count = 0;
        } else {
          selectedFoods[foodIndex].count = 1;
        }
      }
      return { selectedFoods };
    })
  ,
  setSelectedFoods: (newFoods: foodType[]) => set({ selectedFoods: newFoods }),
  clearSelectedFood: () => set({ selectedFoods: [] }),
  increaseCount: (id: number) =>
    set((state: any) => {
      const itemIndex = state.selectedFoods.findIndex((food: foodType) => food.id === id);

      if (itemIndex !== -1) {
        const updatedSelectedFoods = [...state.selectedFoods];
        updatedSelectedFoods[itemIndex] = {
          ...updatedSelectedFoods[itemIndex],
          count: updatedSelectedFoods[itemIndex].count + 1,
        };

        return { selectedFoods: updatedSelectedFoods };
      }
      return state;
    }),
  decreaseCount: (id: number) =>
    set((state: any) => {
      const itemIndex = state.selectedFoods.findIndex((food: foodType) => food.id === id);

      if (itemIndex !== -1) {
        const updatedSelectedFoods = [...state.selectedFoods];
        updatedSelectedFoods[itemIndex] = {
          ...updatedSelectedFoods[itemIndex],
          count: updatedSelectedFoods[itemIndex].count - 1,
        };

        return { selectedFoods: updatedSelectedFoods };
      }
      return state;
    }),

}));
