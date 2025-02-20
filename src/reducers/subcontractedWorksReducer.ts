/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface SubcontractedWork {
  id: string;
  project: string; // ✅ Ensure 'project' field exists
  task_title: string;
  task_description: string;
  task_cost_labor: number;
  task_cost_overhead: number;
}

interface SubcontractedWorkState {
  subcontractedWorks: SubcontractedWork[]; // ✅ Explicitly type the array
  loading: boolean;
  error: string | null;
}

const initialState: SubcontractedWorkState = {
  subcontractedWorks: [],
  loading: false,
  error: null,
};

export const createSubcontractedWork = createAsyncThunk(
  "subcontractedWork/create",
  async (workData: Omit<SubcontractedWork, "id">, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const response = await api.post(constants.endpoints.subcontractor_works.create_subcontracted_work, workData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data as SubcontractedWork; // ✅ Ensure correct type is returned
    } catch (error: any) {
      console.error("❌ Create Subcontracted Work Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.detail || "Failed to create subcontracted work");
    }
  }
);

const subcontractedWorkSlice = createSlice({
  name: "subcontractedWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubcontractedWork.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubcontractedWork.fulfilled, (state, action: PayloadAction<SubcontractedWork>) => {
        state.loading = false;
        state.subcontractedWorks.push(action.payload); // ✅ TypeScript now recognizes this
      })
      .addCase(createSubcontractedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subcontractedWorkSlice.reducer;
