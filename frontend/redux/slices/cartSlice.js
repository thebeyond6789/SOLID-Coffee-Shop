import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, actions) => {
      const { product, quantity, size } = actions.payload;
      const cart = state;
      const index = cart.findIndex(
        (item) => item._id == product._id && item.size == size
      );
      if (index == -1) {
        // chưa có -> thêm và0
        cart.push({ ...product, quantity, size });
        // console.log(1, JSON.stringify(cart));
      } else {
        // đã có -> tăng số lượng
        cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
      }
      state = cart;
      return state;
    },
    removeItem: (state, actions) => {
      const { product, size } = actions.payload;
      const cart = state;
      const index = cart.findIndex(
        (item) => item._id == product._id && item.size == size
      );
      cart.splice(index, 1);
      return cart;
    },
    removeCart: (state) => (state = []),
    updateItem: (state, actions) => {
      const { product, quantity, size } = actions.payload;
      const cart = state;
      const index = cart.findIndex(
        (item) => item._id == product._id && item.size == size
      );
      cart[index].quantity = Math.max(1, quantity);
      return cart;
    },
  },
});

export const { addItem, removeItem, removeCart, updateItem } =
  cartSlice.actions;
export default cartSlice.reducer;