import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

const getAuthHeader = (state) => {
  const token = state.auth.token;
  if (!token) throw new Error("No token found");
  return { Authorization: `Bearer ${token}` };
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const headers = getAuthHeader(state);
      const response = await api.get("/contacts", { headers });

      return response.data;
    } catch (error) {
      toast.error("Failed to load contacts");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactToServer = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const headers = getAuthHeader(state);

      const response = await api.post(
        "/contacts",
        { name, number },
        { headers }
      );

      toast.success("Contact added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const headers = getAuthHeader(state);

      await api.delete(`/contacts/${contactId}`, { headers });

      toast.success("Contact deleted successfully!");
      return contactId;
    } catch (error) {
      toast.error("Failed to delete contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
