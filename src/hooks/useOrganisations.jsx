import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganisationsApi,
  updateOrganisationApi,
  updateTrialDateApi,
  deleteOrganisationApi,
} from "../api/organisationApi";
import {
  setOrganisations,
  setLoading,
  setError,
  removeOrganisation,
  clearError,
  updateOrganisationTemplates,
} from "../store/slices/organisationSlice";

export const useOrganisations = () => {
  const dispatch = useDispatch();
  const { organisations, loading, error } = useSelector(
    (state) => state.organisation
  );

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
  const createOrganisation = useCallback(
    async (organisationData) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        return null;
      } catch (err) {
        dispatch(setError(err.message || "Failed to create organisation"));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // Update existing organisation
  const updateOrganisation = useCallback(
    async (id, organisationData) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const data = await updateOrganisationApi(id, organisationData);

        return null;
      } catch (err) {
        dispatch(setError(err.message || "Failed to update organisation"));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // Update trial date with optimistic updates
  const updateTrialDate = useCallback(
    async (payload) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const data = await updateTrialDateApi(payload);

        // Optimistically update the local state
        dispatch(
          updateOrganisationTemplates({
            id: payload.owner_id,
            templates_allowed: payload.skeletons.length,
            skeletons: payload.skeletons,
          })
        );

        return data;
      } catch (err) {
        // Rollback optimistic update on error
        dispatch(setError(err.message || "Failed to update trial date"));

        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  // Delete organisation
  const deleteOrganisation = useCallback(
    async (id) => {
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
    },
    [dispatch]
  );

  // Clear any errors
  const clearOrganisationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    organisations: organisations,
    loading,
    error,

    fetchOrganisations,
    createOrganisation,
    updateOrganisation,
    updateTrialDate,
    deleteOrganisation,
    clearOrganisationError,
  };
};
