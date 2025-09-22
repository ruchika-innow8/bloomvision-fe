import React, { useMemo, useState } from "react";
import { formatDateToLong } from "../../utils/Helper";
import { useOrganisations } from "../../hooks/useOrganisations";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
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
  useTheme,
  useMediaQuery,
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
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

export default function OrganisationTable({ data, loading }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    deleteOrganisation,
    updateOrganisation,
    updateTrialDate,
    fetchOrganisations,
  } = useOrganisations();
  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState({
    open: false,
    id: null,
    field: null,
    value: "",
    organisation: null,
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
    const currentValue =
      field === "trial_ends"
        ? organisation.trial_ends
        : organisation.trial_starts;
    const dateValue = currentValue ? dayjs(currentValue) : dayjs();

    setEditing({
      open: true,
      id: organisation.id,
      field,
      value: dateValue,
      organisation,
      isLoading: false,
    });
  };

  const closeEdit = () =>
    setEditing({
      open: false,
      id: null,
      field: null,
      value: "",
      organisation: null,
      isLoading: false,
    });

  const saveEdit = async () => {
    if (!editing.value || !editing.organisation) return;

    try {
      const selectedDate = editing.value.format("YYYY-MM-DD");

      // Prepare the API payload according to the specification
      const payload = {
        skeletons: [], // Empty array as per the API spec
        trial_ends: editing.field === "trial_ends" ? selectedDate : undefined,
        owner_id:
          editing.organisation.owner?.id || editing.organisation.owner_id,
      };

      // Show loading state for the save button
      setEditing((prev) => ({ ...prev, isLoading: true }));

      // Call the trial date update API
      await updateTrialDate(payload);

      // Show success message
      setSuccessMessage(
        `Trial date updated successfully for ${editing.organisation.business_name}`
      );

      // Refresh the data to show updated trial date
      await fetchOrganisations();

      // Close the dialog after a short delay to show the success message
      setTimeout(() => {
        closeEdit();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Failed to update trial date:", error);
      // Error handling is already done in the hook - UI will show error state
    } finally {
      // Remove loading state
      setEditing((prev) => ({ ...prev, isLoading: false }));
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
        closeDeleteDialog();
      } catch (error) {
        console.error("Failed to delete organisation:", error);
        // Error handling is already done in the hook
      }
    }
  };

  // Generate avatar from business name
  const getAvatarProps = (businessName) => {
    if (!businessName) return { children: "?" };
    const initials = businessName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Generate color based on name
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
    ];
    const colorIndex = businessName.length % colors.length;

    return {
      children: initials,
      sx: {
        bgcolor: colors[colorIndex],
        color: "white",
        width: 32,
        height: 32,
        fontSize: "0.875rem",
      },
    };
  };

  return (
    <Box sx={{ position: "relative", minHeight: "200px" }}>
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
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table size="medium" aria-label="organisation table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8f9fa" }}>
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
                const isPaymentDone =
                  org.subscription?.is_payment_done === true;
                const templatesAllowed =
                  org.allowed_templates ?? org.templates_allowed ?? 28;
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
                      <Avatar {...getAvatarProps(org.business_name)} />
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
                      <Box sx={{ color: "#666" }}>
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
                        <Tooltip title="Control Template Access">
                          <IconButton size="small" sx={{ color: "#666" }}>
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
                        <Tooltip title="View Details">
                          <IconButton size="small" sx={{ color: "#666" }}>
                            <VisibilityIcon fontSize="small" />
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

        <Dialog open={editing.open} onClose={closeEdit} maxWidth="xs" fullWidth>
          <DialogTitle>Edit Trial Date</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={
                    editing.field === "trial_ends"
                      ? "Trial End Date"
                      : "Trial Start Date"
                  }
                  value={editing.value}
                  onChange={(newValue) => {
                    setEditing((prev) => ({ ...prev, value: newValue }));
                  }}
                  disablePast
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !editing.value,
                      helperText: !editing.value ? "Please select a date" : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEdit} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={saveEdit}
              variant="contained"
              disabled={!editing.value || editing.isLoading}
              sx={{
                minWidth: 100,
                position: "relative",
              }}
            >
              {editing.isLoading ? (
                <>
                  <CircularProgress
                    size={16}
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      marginLeft: "-8px",
                      marginTop: "-8px",
                    }}
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialog.open}
          onClose={closeDeleteDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ color: "#f44336", fontWeight: 600 }}>
            Delete Organisation
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Are you sure you want to delete{" "}
              <strong>{deleteDialog.organisation?.business_name}</strong>?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              This action cannot be undone. All data associated with this
              organisation will be permanently removed.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ pb: 2, px: 3 }}>
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              sx={{ minWidth: 100 }}
            >
              Yes, I'm sure
            </Button>
          </DialogActions>
        </Dialog>
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
