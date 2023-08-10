import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isBankCardModalOpen: false,
    isIbanModalOpen: false,
    isUserInfoModalOpen: false,
    userInfoModalRedirect: undefined,
  },
  reducers: {
    openBankCardModal: (state) => {
      state.isBankCardModalOpen = true;
    },
    closeBankCardModal: (state) => {
      state.isBankCardModalOpen = false;
    },
    openIbanModal: (state) => {
      state.isIbanModalOpen = true;
    },
    closeIbanModal: (state) => {
      state.isIbanModalOpen = false;
    },
    openUserInfoModal: (state, { payload }) => {
      state.isUserInfoModalOpen = true;
      state.userInfoModalRedirect = payload;
    },
    closeUserInfoModal: (state) => {
      state.isUserInfoModalOpen = false;
      state.userInfoModalRedirect = undefined;
    },
  },
});

export const {
  openBankCardModal,
  closeBankCardModal,
  openIbanModal,
  closeIbanModal,
  openUserInfoModal,
  closeUserInfoModal,
} = profileSlice.actions;

export default profileSlice.reducer;
