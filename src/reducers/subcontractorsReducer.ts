/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";

// Define Subcontractor Type
interface Subcontractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  projects: string[]; // Projects assigned to this subcontractor
}

// Define State Type
interface SubcontractorState {
  list: Subcontractor[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: SubcontractorState = {
  list: [],
  loading: false,
  error: null,
};

// Fetch all subcontractors
export const fetchSubcontractors = createAsyncThunk(
  "subcontractors/fetchSubcontractors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/subcontractors/`);
      return response.data as Subcontractor[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch subcontractors"
      );
    }
  }
);

export const fetchSubcontractorsByProject = createAsyncThunk(
  "subcontractors/fetchByProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/projects/my_projects/?project_id=${projectId}`
      );
      return response.data.subcontractors;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch subcontractors");
    }
  }
);


// Assign Subcontractor to Subcontracted Work
export const assignSubcontractorToWork = createAsyncThunk(
  "subcontractors/assignToWork",
  async (
    { workId, subcontractorId }: { workId: string; subcontractorId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/subcontracted-works/${workId}/assign_subcontractor/`,
        {
          subcontractor_id: subcontractorId,
        }
      );

      return { workId, subcontractorId, project: response.data.project }; // Return updated project info
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to assign subcontractor"
      );
    }
  }
);

// Unassign Subcontractor from Subcontracted Work
export const unassignSubcontractorFromWork = createAsyncThunk(
  "subcontractors/unassignFromWork",
  async ({ workId }: { workId: string }, { rejectWithValue }) => {
    try {
      await api.post(`/subcontracted-works/${workId}/unassign_subcontractor/`);
      return { workId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to unassign subcontractor"
      );
    }
  }
);

const subcontractorsSlice = createSlice({
  name: "subcontractors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcontractors.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSubcontractors.fulfilled,
        (state, action: PayloadAction<Subcontractor[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchSubcontractors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(assignSubcontractorToWork.fulfilled, (state, action) => {
        const { subcontractorId, project } = action.payload;
        const subcontractor = state.list.find((s) => s.id === subcontractorId);
        if (subcontractor) {
          subcontractor.projects.push(project);
        }
      })
      .addCase(unassignSubcontractorFromWork.fulfilled, (state, action) => {
        const { workId } = action.payload;
        state.list.forEach((subcontractor) => {
          subcontractor.projects = subcontractor.projects.filter(
            (proj) => proj !== workId
          );
        });
      })
      .addCase(fetchSubcontractorsByProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcontractorsByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubcontractorsByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subcontractorsSlice.reducer;
