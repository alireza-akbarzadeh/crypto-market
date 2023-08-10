import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isDarkTheme: false,
    isAlertOpen: false,
    alertOptions: {
      title: "",
      variant: "success",
      message: "",
      icon: null,
      actionButtons: [],
    },
    isLoadingModalOpen: false,
    loadingModalOptions: {
      title: "",
      message: "",
    },
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.isDarkTheme = payload === "dark" ? true : false;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    openAlert: (state, { payload }) => {
      state.alertOptions = payload;
      state.isAlertOpen = true;
    },
    closeAlert: (state) => {
      state.isAlertOpen = false;
    },
    openLoadingModal: (state, { payload }) => {
      state.loadingModalOptions = {
        title: payload.title,
        message: payload.message,
      };
      state.isLoadingModalOpen = true;
    },
    closeLoadingModal: (state) => {
      state.isLoadingModalOpen = false;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  openAlert,
  closeAlert,
  openLoadingModal,
  closeLoadingModal,
} = appSlice.actions;

export default appSlice.reducer;
