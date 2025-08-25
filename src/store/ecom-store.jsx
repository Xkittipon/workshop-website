import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  category: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      category: [],
      products: [],
      carts: [],
    });
  },
  actionAddToCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    const uniqe = _.unionWith(updateCart, _.isEqual);

    set({ carts: uniqe });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    console.log("update Click", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post(
      "https://workshop-api-tau.vercel.app/api/login",
      form
    );
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ category: res.data });
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to fetch categories");
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  },
  clearCart: async () => {
    set({ carts: [] });
  },
});

const userPersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, userPersist));

export default useEcomStore;
