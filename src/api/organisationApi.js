// src/api/organisationApi.js

import axiosInstance from "./axiosClient";
import { mockOrganisations } from "./mockData";

// Get all organisations
export const getOrganisationsApi = async () => {
  try {
    const response = await axiosInstance.get("/organisations/owners/");
    return response.data;
  } catch (error) {
    // If API is not available, return mock data for testing
    console.warn("API not available, using mock data:", error.message);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return mockOrganisations;
  }
};

// Update organisation
export const updateOrganisationApi = async (id, organisationData) => {
  try {
    const response = await axiosInstance.put(
      `/organisations/owners/${id}/`,
      organisationData
    );
    return response.data;
  } catch (error) {
    // If API is not available, simulate update with mock data
    console.warn("API not available, simulating update:", error.message);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find and update organisation in mock data
    const orgIndex = mockOrganisations.findIndex((org) => org.id === id);
    if (orgIndex === -1) {
      throw new Error("Organisation not found");
    }

    const updatedOrganisation = {
      ...mockOrganisations[orgIndex],
      ...organisationData,
    };

    mockOrganisations[orgIndex] = updatedOrganisation;

    return updatedOrganisation;
  }
};

// Delete organisation
export const deleteOrganisationApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/organisations/${id}/`);
    return response.data;
  } catch (error) {
    // If API is not available, simulate deletion with mock data
    console.warn("API not available, simulating deletion:", error.message);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find and remove organisation from mock data
    const orgIndex = mockOrganisations.findIndex((org) => org.id === id);
    if (orgIndex === -1) {
      throw new Error("Organisation not found");
    }

    mockOrganisations.splice(orgIndex, 1);

    return { success: true };
  }
};

// Update trial date using the specified API endpoint
export const updateTrialDateApi = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/update/trial/", payload);
    return response.data;
  } catch (error) {
    // If API is not available, simulate success for testing
    console.warn(
      "API not available, simulating trial date update:",
      error.message
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response for mock data
    return {
      success: true,
      message: "Trial date updated successfully (mock)",
      trial_ends:
        payload.trial_ends ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now
      data: payload,
    };
  }
};
