/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constants } from "../helpers/constants";
import api from "../api/ijengaApi";

interface Labourer {
  labourer_id: string;
  labourer_name: string;
  national_id_number: string;
  labourer_title: string;
  labourer_daily_rate: number;
}

interface LabourerState {
  labourers: Labourer[];
  loading: boolean;
  error: string | null;
}

const initialState: LabourerState = {
  labourers: [],
  loading: false,
  error: null,
};

export const fetchLabourers = createAsyncThunk<
  Labourer[],  // Expecting an array of labourers
  string,
  { rejectValue: string }
>("labourers/fetchLabourers", async (workId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

    const url = constants.endpoints.labourers.get_labourers_by_works.replace("?", workId);

    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    
    return Array.isArray(response.data) ? response.data : [];
    
  } catch (error: any) {
    console.error("Fetch Labourers Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createLabourer = createAsyncThunk<
  Labourer,
  { labourer_name: string; labourer_title: string; labourer_daily_rate: number; labourer_mpesa_number: string; national_id_number: string; subcontracted_works: string[] },
  { rejectValue: string }
>(
  "labourers/createLabourer",
  async (labourerData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = constants.endpoints.labourers.create_and_assign_labourers;
      const response = await api.post(url, labourerData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const labourerSlice = createSlice({
  name: "labourers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabourers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabourers.fulfilled, (state, action) => {
        state.loading = false;
        state.labourers = action.payload;
      })
      .addCase(fetchLabourers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createLabourer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLabourer.fulfilled, (state, action) => {
        state.loading = false;
        state.labourers.push(action.payload);
      })
      .addCase(createLabourer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default labourerSlice.reducer;
