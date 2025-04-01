import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";

interface MetadataState {
  labourerTitles: { key: string; label: string }[];
  taskCategories: { key: string; label: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: MetadataState = {
  labourerTitles: [],
  taskCategories: [],
  loading: false,
  error: null,
};

export const fetchMetadata = createAsyncThunk(
  "metadata/fetch",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    if (!token) return rejectWithValue("Unauthorized");

    const response = await api.get("/metadata/titles_and_task_categories/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  }
);

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.labourerTitles = action.payload.labourer_titles;
        state.taskCategories = action.payload.task_categories;
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default metadataSlice.reducer;
