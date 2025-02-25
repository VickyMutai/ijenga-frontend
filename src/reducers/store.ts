import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import subcontractedWorkReducer from "./subcontractedWorksReducer";
import labourersReducer from "./labourerReducer";
import proofofworkReducer from "./proofOfWorksReducer"
const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    subcontractedWorks: subcontractedWorkReducer,
    labourers: labourersReducer,
    proofOfWorks: proofofworkReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
