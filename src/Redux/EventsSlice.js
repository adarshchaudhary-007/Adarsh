import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getevent/1", {
        params: { tenant_id: 1 },
      });
      const data = response.data;
      let eventsArray = [];
      if (data.details && Array.isArray(data.details)) {
        eventsArray = data.details;
      } else if (Array.isArray(data)) {
        eventsArray = data;
      } else if (data && Array.isArray(data.events)) {
        eventsArray = data.events;
      }
      return eventsArray;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch events";
      });
  },
});

export default EventsSlice.reducer;
