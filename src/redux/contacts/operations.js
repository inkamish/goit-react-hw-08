import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
      const token = state.auth.token;
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "/contacts",
        { name, number },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
      const token = state.auth.token;
      if (!token) throw new Error("No token found");

      await axios.delete(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Contact deleted successfully!");
      return contactId;
    } catch (error) {
      toast.error("Failed to delete contact");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
