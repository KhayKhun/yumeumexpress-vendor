import { create } from "zustand";

export const userOrderStore = create((set) => ({
    orders: [],
    setOrders: (payload: any) => set({ orders: payload }),
    updateOrders: (newOrder: any) => set((state: any) => {
        const existingOrderIds = new Set(state.orders.map((o: any) => o.id));

        if (!existingOrderIds.has(newOrder.id)) {

            return { orders: [...state.orders, newOrder] };
        }
        return { orders: [...state.orders] };

    })
}));
