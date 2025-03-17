import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface ProofOfWork {
  image_id: string;
  image_file: string;
  description: string;
}

interface ProofOfWorksState {
  proofOfWorks: ProofOfWork[];
  loading: boolean;
  error: string | null;
}

const initialState: ProofOfWorksState = {
  proofOfWorks: [],
  loading: false,
  error: null,
};

export const fetchProofOfWorks = createAsyncThunk(
  "proofOfWorks/fetch",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = constants.endpoints.subcontractor_works.get_proof_of_works.replace("?", workId);
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching proof of works");
    }
  }
);

export const uploadProofOfWork = createAsyncThunk(
  "proofOfWorks/upload",
  async ({ workId, formData }: { workId: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = constants.endpoints.subcontractor_works.proof_of_works.replace("?", workId)
      
      const response = await api.post(url, formData, {
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      });

    
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error uploading proof of work");
    }
  }
);

const proofOfWorksSlice = createSlice({
  name: "proofOfWorks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProofOfWorks.fulfilled, (state, action) => {
        state.proofOfWorks = action.payload;
        state.loading = false;
      });
      
  },
});

export default proofOfWorksSlice.reducer;
