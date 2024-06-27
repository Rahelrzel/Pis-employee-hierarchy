"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoading: boolean;
  error?: string;
  isAuthenticated: boolean;
  user?: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  desc?: string;
  salary?: number;
  email: string;
  parentId?: string;
  role: Role;
  parent?: any;
  token: string;

  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  isLoading: false,
  error: "",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },

    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginFail, loginSuccess } = auth.actions;
export default auth.reducer;
