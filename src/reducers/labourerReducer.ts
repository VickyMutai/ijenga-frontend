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
  labourer_mpesa_number: string;
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

    
    return response.data.data;
    
  } catch (error: any) {
    console.error("Fetch Labourers Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createLabourer = createAsyncThunk<
  Labourer,
  {
    workId: string;
    labourer_name: string;
    national_id_number: string;
    labourer_title: string;
    labourer_mpesa_number: string;
    labourer_daily_rate: number;
  },
  { rejectValue: string }
>(
  "labourers/createLabourer",
  async ({ workId, ...labourerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      const url = constants.endpoints.labourers.create_and_assign_labourers.replace("?", workId);

      // Ensure workId is included in subcontracted_works array
      const payload = {
        ...labourerData,
        subcontracted_works: [workId], // ✅ Ensure workId is sent
      };

      const response = await api.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creating laborer");
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
