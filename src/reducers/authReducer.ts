import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface AuthState {
  user: Record<string, unknown> | null;
  permissions: Record<string, boolean> | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  permissions: null,
  token: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { 
    email: string; 
    password: string; 
    re_enter_password: string; 
    first_name: string; 
    last_name: string; 
    role: string; 
    phone_number: string; 
  }, { rejectWithValue }) => {
    try {
      const response = await api.post(constants.endpoints.auth.register, userData);
      
      // Extract user and token from response
      const { user, tokens } = response.data.data;

      // Store the token securely
      localStorage.setItem("authToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);

      return { user, token: tokens.access };
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      if (typeof error === "object" && error !== null && "response" in error) {
        return rejectWithValue((error as { response?: { data?: string } }).response?.data || "Registration failed");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(constants.endpoints.auth.login, credentials);
      const { tokens, user } = response.data.data;

      if (tokens?.access) {
        localStorage.setItem("authToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
      } else {
        console.error("No access token received from API");
        return rejectWithValue("No token received from server");
      }

      return { user, token: tokens.access };
    } catch (error: unknown) {
      console.error("Login error:", error); // Debugging
      return rejectWithValue("Login failed. Check your credentials.");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");


    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      // Step 1: Check if user is logged in
      const response = await api.get(constants.endpoints.auth.is_logged_in, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.data.is_logged_in) {
        const userResponse = await api.get(constants.endpoints.auth.user, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return { 
          user: userResponse.data.data.user, 
          permissions: userResponse.data.data.permissions, 
          token 
        };
      } else {
        return rejectWithValue("User not logged in");
      }
    } catch (error: unknown) {
      console.error("Auto-login error:", error);
      return rejectWithValue("Failed to load user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.permissions = null;
      state.token = null;
      localStorage.removeItem("authToken"); // ✅ Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
        state.token = action.payload.token;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.permissions = null;
        state.token = null;
      });
  },
});



export const { logout } = authSlice.actions;
export default authSlice.reducer;
