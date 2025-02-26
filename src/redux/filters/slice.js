import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const selectNameFilter = (state) => state.filters?.name ?? "";

export default filterSlice.reducer;
