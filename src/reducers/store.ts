import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import subcontractedWorkReducer from "./subcontractedWorksReducer";
import labourersReducer from "./labourerReducer";
import proofofworkReducer from "./proofOfWorksReducer";
import subcontractorsReducer from "./subcontractorsReducer";
import metaReducer from "./metaReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    subcontractedWorks: subcontractedWorkReducer,
    labourers: labourersReducer,
    proofOfWorks: proofofworkReducer,
    subcontractors: subcontractorsReducer,
    metaData: metaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
