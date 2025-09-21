// src/api/organisationApi.js

import axios from "axios";
import { mockOrganisations } from "./mockData";

const API_BASE_URL = "http://localhost:5000";

export const getOrganisationsApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organisations/owners/`);
    return response.data;
  } catch (error) {
    // If API is not available, return mock data for testing
    console.warn("API not available, using mock data:", error.message);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return mockOrganisations;
  }
};
