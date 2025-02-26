import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as yup from "yup";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      await userSchema.validate(userData, { abortEarly: false });
      const response = await axios.post("/users/signup", userData);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setAuthHeader(token);

      toast.success("Successfully registered!");
      return response.data;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return thunkAPI.rejectWithValue(error.errors);
      }
      toast.error(error.response?.data?.message || "Registration failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "This email is already registered"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      await userSchema.validate(userData, { abortEarly: false });
      const response = await axios.post("/users/login", userData);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setAuthHeader(token);

      toast.success("Successfully logged in!");
      return response.data;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return thunkAPI.rejectWithValue(error.errors);
      }
      toast.error("Invalid email or password");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email or password is incorrect"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No active session found");
      return thunkAPI.rejectWithValue("No token found");
    }

    await axios.post("/users/logout");
    localStorage.removeItem("token");
    clearAuthHeader();

    toast.success("Successfully logged out!");
  } catch (error) {
    toast.error("Logout failed. Try again.");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);
