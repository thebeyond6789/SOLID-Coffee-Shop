import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: null,
  reducers: {
    sortASC: (state) => (state = "ASC"), // Tăng dần
    sortDESC: (state) => (state = "DESC"), // Giảm dần
    sortDefault: (state) => (state = null), // Mặc định
  },
});

export const { sortASC, sortDESC, sortDefault } = sortSlice.actions;
export default sortSlice.reducer;
