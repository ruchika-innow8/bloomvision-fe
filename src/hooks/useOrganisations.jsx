import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganisationsApi,
  createOrganisationApi,
  updateOrganisationApi,
  deleteOrganisationApi,
} from "../api/organisationApi";
import {
  setOrganisations,
  setLoading,
  setError,
  addOrganisation,
  updateOrganisation,
  removeOrganisation,
  clearError,
} from "../store/slices/organisationSlice";

export const useOrganisations = () => {
  const dispatch = useDispatch();
  const { organisations, loading, error } = useSelector((state) => state.organisation);

  // Fetch all organisations
  const fetchOrganisations = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await getOrganisationsApi();
      dispatch(setOrganisations(data));
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch organisations"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Create new organisation
  const createOrganisation = useCallback(async (organisationData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await createOrganisationApi(organisationData);
      dispatch(addOrganisation(data));
      return data;
    } catch (err) {
      dispatch(setError(err.message || "Failed to create organisation"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Update existing organisation
  const updateOrganisation = useCallback(async (id, organisationData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await updateOrganisationApi(id, organisationData);
      dispatch(updateOrganisation({ id, data }));
      return data;
    } catch (err) {
      dispatch(setError(err.message || "Failed to update organisation"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Delete organisation
  const deleteOrganisation = useCallback(async (id) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await deleteOrganisationApi(id);
      dispatch(removeOrganisation(id));
    } catch (err) {
      dispatch(setError(err.message || "Failed to delete organisation"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Clear any errors
  const clearOrganisationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // Data
    organisations: organisations,
    loading,
    error,

    // Actions
    fetchOrganisations,
    createOrganisation,
    updateOrganisation,
    deleteOrganisation,
    clearOrganisationError,
  };
};
