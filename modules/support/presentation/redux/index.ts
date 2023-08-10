import { createSlice } from "@reduxjs/toolkit";

export const supportSlice = createSlice({
  name: "support",
  initialState: {
    isSupportOpen: false,
    supportInitialStack: [],
  },
  reducers: {
    openSupport: (state, action?: any) => {
      state.isSupportOpen = true;
      state.supportInitialStack = action.payload;
    },
    closeSupport: (state) => {
      state.isSupportOpen = false;
      state.supportInitialStack = [];
    },
  },
});

export const { openSupport, closeSupport } = supportSlice.actions;

export default supportSlice.reducer;
