// src/store/slices/organisationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const organisationSlice = createSlice({
  name: "organisation",
  initialState: {
    organisations: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOrganisations: (state, action) => {
      state.organisations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addOrganisation: (state, action) => {
      state.organisations.unshift(action.payload);
    },
    updateOrganisation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.organisations.findIndex(org => org.id === id);
      if (index !== -1) {
        state.organisations[index] = { ...state.organisations[index], ...data };
      }
    },
    removeOrganisation: (state, action) => {
      state.organisations = state.organisations.filter(org => org.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setOrganisations,
  setLoading,
  setError,
  addOrganisation,
  updateOrganisation,
  removeOrganisation,
  clearError,
} = organisationSlice.actions;

export default organisationSlice.reducer;
