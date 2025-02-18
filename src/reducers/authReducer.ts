import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface AuthState {
  user: Record<string, unknown> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(constants.endpoints.auth.register, userData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        return rejectWithValue((error as { response?: { data?: string } }).response?.data || "Registration failed");
      }
      return rejectWithValue("An unknown error occurred")
    }
}
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
