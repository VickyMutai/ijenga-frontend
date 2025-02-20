import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer, // ✅ Add projects reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
