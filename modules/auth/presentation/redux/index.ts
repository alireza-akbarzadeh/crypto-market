import { getLocalStorageToken } from "@/core/helpers";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getLocalStorageToken() || "",
    deviceId:
      typeof window !== "undefined" ? localStorage.getItem("deviceId") : "",
    isLoginModalOpen: false,
    cachedLogo: undefined,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setCachedLogo: (state, { payload }) => {
      state.cachedLogo = payload;
    },
    setDeviceId: (state, { payload }) => {
      state.deviceId = payload;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  setToken,
  setDeviceId,
  setCachedLogo,
} = authSlice.actions;

export default authSlice.reducer;
