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
    updateOrganisation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.organisations.findIndex((org) => org.id === id);
      if (index !== -1) {
        state.organisations[index] = { ...state.organisations[index], ...data };
      }
    },
    updateOrganisationTemplates: (state, action) => {
      const { id, templates_allowed, skeletons } = action.payload;
      const index = state.organisations.findIndex((org) => org.id === id);
      if (index !== -1) {
        state.organisations[index].templates_allowed = templates_allowed;
        state.organisations[index].allowed_templates = templates_allowed;
        // Always update skeletons if provided, even if it's an empty array
        if (skeletons !== undefined) {
          state.organisations[index].skeletons = skeletons;
        }
      }
    },
    updateTrialDate: (state, action) => {
      const { id, trial_ends } = action.payload;
      const index = state.organisations.findIndex((org) => org.id === id);
      if (index !== -1) {
        state.organisations[index].trial_ends = trial_ends;
      }
    },
    removeOrganisation: (state, action) => {
      state.organisations = state.organisations.filter(
        (org) => org.id !== action.payload
      );
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
  updateOrganisation,
  updateOrganisationTemplates,
  updateTrialDate,
  removeOrganisation,
  clearError,
} = organisationSlice.actions;

export default organisationSlice.reducer;
