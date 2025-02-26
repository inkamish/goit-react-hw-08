import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) throw new Error("No token found");

      const response = await axios.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactToServer = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "/contacts",
        { name, number },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) throw new Error("No token found");

      await axios.delete(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
