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
  labourer_overhead_cost: number;
  number_of_days_worked: number;
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
  Labourer[], // Expecting an array of labourers
  string,
  { rejectValue: string }
>("labourers/fetchLabourers", async (workId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token)
      return rejectWithValue("Unauthorized: No authentication token found.");

    const url = constants.endpoints.labourers.get_labourers_by_works.replace(
      "?",
      workId
    );

    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error: any) {
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

      const url =
        constants.endpoints.labourers.create_and_assign_labourers.replace(
          "?",
          workId
        );

      const payload = {
        ...labourerData,
        subcontracted_works: [workId],
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

export const editLabourer = createAsyncThunk<
  Labourer,
  { labourer_id: string; updatedData: Partial<Labourer> },
  { rejectValue: string }
>(
  "labourers/editLabourer",
  async ({ labourer_id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      const url = constants.endpoints.labourers.edit_labourer.replace(
        "?",
        labourer_id
      );

      const response = await api.put(url, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to edit laborer");
    }
  }
);

export const deleteLabourer = createAsyncThunk<
  string,
  string, // Expecting labourer ID
  { rejectValue: string }
>("labourers/deleteLabourer", async (labourer_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token)
      return rejectWithValue("Unauthorized: No authentication token found.");

    const url = constants.endpoints.labourers.delete_labourer.replace(
      "{labourer_id}",
      labourer_id
    );

    await api.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return labourer_id; // Return deleted labourer ID
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to delete laborer");
  }
});

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
      })
      .addCase(editLabourer.fulfilled, (state, action) => {
        state.loading = false;
        state.labourers = state.labourers.map((labourer) =>
          labourer.labourer_id === action.payload.labourer_id
            ? { ...labourer, ...action.payload }
            : labourer
        );
      })
      .addCase(editLabourer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteLabourer.fulfilled, (state, action) => {
        state.loading = false;
        state.labourers = state.labourers.filter(
          (labourer) => labourer.labourer_id !== action.payload
        );
      })
      .addCase(deleteLabourer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default labourerSlice.reducer;
