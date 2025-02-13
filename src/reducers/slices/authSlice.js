import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  user: null,  // The user data will be stored here after login
  token: null, // Authentication token
  loading: false,  // Track loading status
  error: null,  // Error message if any
}

// Create slice for authentication
const authSlice = createSlice({
  name: 'auth', // name of the slice
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
  },
})

// Export the actions for use in components
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

// Export the reducer to be included in the store
export default authSlice.reducer
