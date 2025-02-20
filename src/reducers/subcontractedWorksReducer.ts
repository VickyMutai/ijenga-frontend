/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface SubcontractedWork {
  id: string;
  project: string;
  task_title: string;
  task_description: string;
  task_cost_labor: number;
  task_cost_overhead: number;
}
  

interface SubcontractedWorkState {
  subcontractedWorks: SubcontractedWork[];
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

      return response.data.data as SubcontractedWork; 
    } catch (error: any) {
      console.error("❌ Create Subcontracted Work Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.detail || "Failed to create subcontracted work");
    }
  }
);


export const fetchSubcontractedWorks = createAsyncThunk(
    "subcontractedWork/fetchSubcontractedWorks",
    async (projectId: string, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return rejectWithValue("Unauthorized: No authentication token found.");
  
        const response = await api.get(`${constants.endpoints.subcontractor_works.get_subcontracted_works}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { project_id: projectId },
        });
  
        return response.data.data.map((work: any) => ({
          id: work.id, 
          project: work.project, 
          taskTitle: work.task_title,
          taskDescription: work.task_description,
          taskCostLabor: Number(work.task_cost_labor),
          taskCostOverhead: Number(work.task_cost_overhead),
        })) as SubcontractedWork[];
      } catch (error: any) {
        console.error("Fetch Subcontracted Works Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.detail || "Failed to fetch subcontracted works");
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
        state.subcontractedWorks.push(action.payload);
      })
      .addCase(createSubcontractedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSubcontractedWorks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcontractedWorks.fulfilled, (state, action: PayloadAction<SubcontractedWork[]>) => {
        state.loading = false;
        state.subcontractedWorks = action.payload;
      })
      .addCase(fetchSubcontractedWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subcontractedWorkSlice.reducer;
