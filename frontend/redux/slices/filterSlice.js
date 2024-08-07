import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: { min: 0, max: 9999999999 },
  reducers: {
    setMin: (state, actions) => {
      state = actions.payload;
      return state;
    }, // Tăng dần
    setMax: (state, actions) => {
      state = actions.payload;
      return state;
    }, // Giảm dần
  },
});

export const { setMin, setMax } = filterSlice.actions;
export default filterSlice.reducer;
