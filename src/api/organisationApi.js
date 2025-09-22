// src/api/organisationApi.js

import axiosInstance from "./axiosClient";
import { mockOrganisations } from "./mockData";

const API_BASE_URL = "http://localhost:5000";

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

// Create new organisation
export const createOrganisationApi = async (organisationData) => {
  try {
    const response = await axiosInstance.post(
      "/organisations/owners/",
      organisationData
    );
    return response.data;
  } catch (error) {
    // If API is not available, simulate creation with mock data
    console.warn("API not available, simulating creation:", error.message);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate new ID
    const newId = Math.max(...mockOrganisations.map((org) => org.id)) + 1;

    // Create new organisation
    const newOrganisation = {
      id: newId,
      ...organisationData,
    };

    // Add to mock data (in a real app, this would be handled by the API)
    mockOrganisations.unshift(newOrganisation);

    return newOrganisation;
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
    const response = await axiosInstance.delete(`/organisations/owners/${id}/`);
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
      data: payload,
    };
  }
};
