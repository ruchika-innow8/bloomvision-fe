// src/store/slices/organisationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrganisationsApi } from "../../api/organisationApi";

export const fetchOrganisations = createAsyncThunk(
  "organisation/fetchOrganisations",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrganisationsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organisations"
      );
    }
  }
);

const organisationSlice = createSlice({
  name: "organisation",
  initialState: {
    organisations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganisations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganisations.fulfilled, (state, action) => {
        state.loading = false;
        state.organisations = action.payload;
      })
      .addCase(fetchOrganisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default organisationSlice.reducer;
