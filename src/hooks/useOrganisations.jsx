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
  updateTrialDate,
} from "../store/slices/organisationSlice";

export const useOrganisations = () => {
  const dispatch = useDispatch();
  const { organisations, loading, error } = useSelector(
    (state) => state.organisation
  );

  // Shared function to fetch and update organizations
  const fetchOrganizationsData = useCallback(async () => {
    const data = await getOrganisationsApi();
    dispatch(setOrganisations(data));
    return data;
  }, [dispatch]);

  // Fetch all organisations
  const fetchOrganisations = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await fetchOrganizationsData();
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch organisations"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, fetchOrganizationsData]);

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

        // Update trial_ends field if provided in the response
        if (data?.trial_ends) {
          dispatch(
            updateTrialDate({
              id: payload.owner_id,
              trial_ends: data.trial_ends,
            })
          );
        }

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

  // Refresh organisations data from API
  const refreshOrganisationsData = useCallback(async () => {
    try {
      await fetchOrganizationsData();
    } catch (err) {
      console.error("Failed to refresh organisations data:", err);
      // Don't set error here as this is a background refresh
    }
  }, [dispatch, fetchOrganizationsData]);

  // Clear any errors
  const clearOrganisationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    organisations: organisations,
    loading,
    error,

    fetchOrganisations,
    updateOrganisation,
    updateTrialDate,
    deleteOrganisation,
    refreshOrganisationsData,
    clearOrganisationError,
  };
};
