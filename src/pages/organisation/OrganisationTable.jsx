import React, { useMemo, useState } from "react";
import { formatDateToLong } from "../../utils/Helper";
import { useOrganisations } from "../../hooks/useOrganisations";
import {
  TrialDateModal,
  TemplateAccessModal,
  DeleteConfirmationModal,
} from "../../components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Chip,
  // useTheme,
  // useMediaQuery,
  Skeleton,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  History as HistoryIcon,
  AccessTime as AccessTimeIcon,
  LocalFlorist as LocalFloristIcon,
  Settings as SettingsIcon,
  ManageAccounts as ManageAccountsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";

export default function OrganisationTable({ data, loading }) {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    deleteOrganisation,
    // updateOrganisation,
    updateTrialDate,
    fetchOrganisations,
  } = useOrganisations();
  const [selectedIds, setSelectedIds] = useState([]);
  const [trialDateModal, setTrialDateModal] = useState({
    open: false,
    organisation: null,
    field: null,
    isLoading: false,
  });
  const [templateAccessModal, setTemplateAccessModal] = useState({
    open: false,
    organisations: [], // Changed from single organisation to array
    isLoading: false,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    organisation: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const rows = useMemo(() => data ?? [], [data]);
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(rows.map((r) => r.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openEdit = (organisation, field) => {
    setTrialDateModal({
      open: true,
      organisation,
      field,
      isLoading: false,
    });
  };

  const closeTrialDateModal = () => {
    setTrialDateModal({
      open: false,
      organisation: null,
      field: null,
      isLoading: false,
    });
  };

  const handleTrialDateSave = async (payload) => {
    try {
      setTrialDateModal((prev) => ({ ...prev, isLoading: true }));
      await updateTrialDate(payload);
      setSuccessMessage(
        `Trial date updated successfully for ${trialDateModal.organisation.business_name}`
      );

      // Close modal immediately after successful update
      setTimeout(() => {
        closeTrialDateModal();
        setSuccessMessage("");
      }, 500); // Short delay to show success feedback
    } catch (error) {
      console.error("Failed to update trial date:", error);
      setTrialDateModal((prev) => ({ ...prev, isLoading: false }));
      // Error is already handled in the hook
    }
  };

  // Get selected organisations
  const selectedOrganisations = rows.filter((org) =>
    selectedIds.includes(org.id)
  );

  const openTemplateAccessModal = (organisation = null) => {
    if (organisation) {
      // Single organisation mode
      setTemplateAccessModal({
        open: true,
        organisations: [organisation],
        isLoading: false,
      });
    } else if (selectedOrganisations.length > 0) {
      // Bulk mode
      setTemplateAccessModal({
        open: true,
        organisations: selectedOrganisations,
        isLoading: false,
      });
    }
  };

  const closeTemplateAccessModal = () => {
    setTemplateAccessModal({
      open: false,
      organisations: [],
      isLoading: false,
    });
  };

  const handleTemplateAccessSave = async (payload) => {
    try {
      setTemplateAccessModal((prev) => ({ ...prev, isLoading: true }));

      // Call the API for each selected organisation
      const updatePromises = templateAccessModal.organisations.map((org) => {
        const orgPayload = {
          ...payload,
          owner_id: org.owner?.id || org.owner_id,
          trial_ends: org.trial_ends || org.trial_end,
        };
        return updateTrialDate(orgPayload);
      });

      await Promise.all(updatePromises);

      setSuccessMessage(
        `Template access updated successfully for ${
          templateAccessModal.organisations.length
        } organisation${
          templateAccessModal.organisations.length > 1 ? "s" : ""
        }`
      );

      // Close modal only after successful API response
      setTimeout(async () => {
        closeTemplateAccessModal();
        setSuccessMessage("");
        // Clear selected checkboxes after successful save
        setSelectedIds([]);
        // Refresh the organizations data
        await fetchOrganisations();
      }, 1000); // Give user time to see success message
    } catch (error) {
      console.error("Failed to update template access:", error);
      setTemplateAccessModal((prev) => ({ ...prev, isLoading: false }));
      throw error; // Re-throw to show error in modal
    }
  };

  const openDeleteDialog = (organisation) => {
    setDeleteDialog({
      open: true,
      organisation,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      organisation: null,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.organisation) {
      try {
        await deleteOrganisation(deleteDialog.organisation.id);

        setSuccessMessage(
          `Organisation "${deleteDialog.organisation.business_name}" deleted successfully`
        );

        closeDeleteDialog();

        // Clear success message after 4 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } catch (error) {
        console.error("Failed to delete organisation:", error);
        // Error handling is already done in the hook
      }
    }
  };

  return (
    <Box
      sx={{ position: "relative", minHeight: "200px", width: "100%", pb: 2 }}
    >
      {/* Bulk Actions Bar - shows when items are selected */}
      {selectedIds.length > 0 && (
        <Box
          sx={{
            position: "sticky",
            top: 80,
            right: 16,
            zIndex: theme.zIndex.appBar + 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 2,
            mb: 2,
            width: "fit-content",
            ml: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {selectedIds.length} selected
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => openTemplateAccessModal()}
            startIcon={<LocalFloristIcon />}
            sx={{
              bgcolor: "#4caf50",
              "&:hover": {
                bgcolor: "#45a049",
              },
            }}
          >
            Bulk Template Access
          </Button>
        </Box>
      )}

      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            zIndex: theme.zIndex.modal - 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: 2,
          overflow: "hidden",
          mt: 2,
        }}
      >
        <Table size="medium" aria-label="organisation table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8f9fa",
                position: "sticky",
                top: 0,
                zIndex: theme.zIndex.appBar - 1,
              }}
            >
              <TableCell
                padding="checkbox"
                sx={{ borderBottom: "1px solid #e0e0e0" }}
              >
                <Checkbox
                  indeterminate={someSelected}
                  checked={allSelected}
                  onChange={toggleAll}
                  inputProps={{ "aria-label": "select all" }}
                  size="small"
                />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                PROFILE
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                BUSINESS NAME
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                OWNER NAME
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                EMAIL
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                TRIAL ENDS
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                ALLOWED TEMPLATES
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.875rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={20} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="circular" width={32} height={32} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={120} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={180} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : rows.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No organizations found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows.map((org, index) => {
                // const isPaymentDone =
                //   org.subscription?.is_payment_done === true;
                const templatesAllowed = org.skeletons
                  ? org.skeletons.length
                  : org.allowed_templates ?? org.templates_allowed ?? 0;
                const trialEnd = org.trial_ends || org.trial_end;

                return (
                  <TableRow
                    key={org.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#f8f9fa" },
                      borderBottom:
                        index === rows.length - 1
                          ? "none"
                          : "1px solid #f0f0f0",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(org.id)}
                        onChange={() => toggleOne(org.id)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Avatar
                        src={org.owner?.profile_picture}
                        alt={org.owner?.name || org.business_name}
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: org.owner?.profile_picture
                            ? "transparent"
                            : undefined,
                        }}
                      >
                        {!org.owner?.profile_picture
                          ? (org.owner?.name || org.business_name || "N/A")
                              .charAt(0)
                              .toUpperCase()
                          : null}
                      </Avatar>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ fontWeight: 500, color: "#333" }}>
                        {org.business_name || "N/A"}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ color: "#666" }}>
                        {org.owner?.name || org.owner_name || "N/A"}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ color: "#666" }}>
                        {org.owner?.email || org.owner_email || "N/A"}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {trialDateModal.isLoading &&
                        trialDateModal.organisation?.id === org.id ? (
                          <CircularProgress size={16} />
                        ) : null}
                        {formatDateToLong(trialEnd)}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${templatesAllowed} Templates allowed`}
                        size="small"
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label="Complete"
                        size="small"
                        sx={{
                          bgcolor: "#e8f5e8",
                          color: "#2e7d32",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Manage Account">
                          <IconButton size="small" sx={{ color: "#666" }}>
                            <ManageAccountsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Control Template Access">
                          <IconButton
                            size="small"
                            sx={{ color: "#666" }}
                            onClick={() => openTemplateAccessModal(org)}
                          >
                            <LocalFloristIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Trial Dates">
                          <IconButton
                            size="small"
                            sx={{ color: "#666" }}
                            onClick={() => openEdit(org, "trial_ends")}
                          >
                            <AccessTimeIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Organisation">
                          <IconButton
                            size="small"
                            sx={{ color: "#f44336" }}
                            onClick={() => openDeleteDialog(org)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>

        <TrialDateModal
          open={trialDateModal.open}
          onClose={closeTrialDateModal}
          onSave={handleTrialDateSave}
          organisation={trialDateModal.organisation}
          field={trialDateModal.field}
          isLoading={trialDateModal.isLoading}
        />

        <TemplateAccessModal
          open={templateAccessModal.open}
          onClose={closeTemplateAccessModal}
          onSave={handleTemplateAccessSave}
          organisations={templateAccessModal.organisations} // Changed from organisation to organisations
          isLoading={templateAccessModal.isLoading}
          onRefreshOrganisations={fetchOrganisations}
        />

        <DeleteConfirmationModal
          open={deleteDialog.open}
          onClose={closeDeleteDialog}
          onConfirm={handleDeleteConfirm}
          itemName={deleteDialog.organisation?.business_name}
          title="Delete Organisation"
          description="This action cannot be undone. All data associated with this organisation will be permanently removed."
          confirmText="Yes, I'm sure"
          cancelText="Cancel"
        />
      </TableContainer>

      {/* Success message snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
