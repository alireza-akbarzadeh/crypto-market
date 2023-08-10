import { configureStore } from "@reduxjs/toolkit";
import app from "@/modules/_app/presentation/redux";
import auth from "@/modules/auth/presentation/redux";
import order from "@/modules/order/presentation/redux";
import profile from "@/modules/profile/presentation/redux";
import support from "@/modules/support/presentation/redux";

const store = configureStore({
  reducer: { app, auth, order, profile, support },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
