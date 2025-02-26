// src/redux/FrontCompaniesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set baseURL to '/' so all relative requests go through the proxy
axios.defaults.baseURL = '/';

export const fetchFrontCompanyDetails = createAsyncThunk(
  'frontCompanies/fetchFrontCompanyDetails',
  async (companyId, thunkAPI) => {
    try {
      // Use relative URL to allow proxy to forward the request
      const response = await axios.get(`/api/directorycompany/${companyId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error fetching company details'
      );
    }
  }
);

const frontCompaniesSlice = createSlice({
  name: 'frontCompanies',
  initialState: {
    company: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrontCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFrontCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchFrontCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default frontCompaniesSlice.reducer;
