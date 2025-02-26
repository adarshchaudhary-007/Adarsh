import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanyDetails = createAsyncThunk(
  'company/fetchCompanyDetails',
  async (companyParam, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/directorycompany/${companyParam}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching company details');
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyDetails: null, 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyDetails = {
          details: action.payload.companydetails?.[0] || null,
          pages: action.payload.companypages || [],
        };
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
