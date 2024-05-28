import { createSlice } from "@reduxjs/toolkit";
import apis from "../CommonComponents/apis";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.product_id !== itemId);
      console.log(state.items);
      const token = localStorage.getItem("retailer_accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "marketplace-edit",
        },
      };

      const payload = {
        product_id: itemId,
      };

      apis
        .post("retailer/removeItemFromCart", payload, config)
        .then((res) => {
          toast.error(res.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          toast.error("Something went wrong!. Please try again later.", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        });
    },

    updateQuantity: (state, action) => {
      // console.log("vinayak")
      const item = action.payload;
      const { product_id } = action.payload;
      const existingItem = state.items.find(
        (item) => product_id === item.product_id
      );

      if (existingItem) {
        existingItem.quantity = item.quantity;
        console.log(existingItem, "existingItem");
      } else {
        state.items.push(item);
        console.log(item, "item");
      }

      const token = localStorage.getItem("retailer_accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "marketplace-edit",
          accept: "application/json",
        },
      };

      apis
        .post("retailer/addToCart", item, config)
        .then((res) => {
          toast.success(res.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    restoreStore: (state, action) => {
      const cartItems = action.payload;
      state.items = cartItems;
    },

    clearCart: (state) => {
      state.items = [];

      const token = localStorage.getItem("retailer_accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "marketplace-edit",
        },
      };

      apis
        .get("retailer/clearCart", config)
        .then((res) => {
          toast.success(res.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          toast.error("Something went wrong!. Please try again later.", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        });
    },
  },
});

export const { removeFromCart, updateQuantity, restoreStore, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
