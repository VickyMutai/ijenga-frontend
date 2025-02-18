// authActions.ts

// Define types for your action payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

// Action types
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

// Action creators
export const loginUser = (userData: LoginPayload) => ({
  type: LOGIN,
  payload: userData,
});

export const registerUser = (userData: RegisterPayload) => ({
  type: REGISTER,
  payload: userData,
});
