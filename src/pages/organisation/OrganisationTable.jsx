import React, { useMemo, useState } from "react";
import { formatDateToLong } from "../../utils/Helper";
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
  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState({
    open: false,
    id: null,
    field: null,
    value: "",
  });

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

  const openEdit = (row, field) => {
    const current =
      field === "trial_starts" ? row.trial_starts : row.trial_ends;
    setEditing({ open: true, id: row.id, field, value: current || "" });
  };

  const closeEdit = () =>
    setEditing({ open: false, id: null, field: null, value: "" });

  const saveEdit = () => {
    // Placeholder: integrate with API to PATCH date later
    closeEdit();
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
                const isPaymentDone = org.subscription?.is_payment_done === true;
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
                        <Tooltip title="Delete">
                          <IconButton size="small" sx={{ color: "#f44336" }}>
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
          <DialogTitle>
            Edit {editing.field === "trial_starts" ? "Trial Start" : "Trial End"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <TextField
                label="Date"
                type="datetime-local"
                value={
                  editing.value
                    ? new Date(editing.value).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setEditing((p) => ({ ...p, value: e.target.value }))
                }
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEdit} variant="text">
              Cancel
            </Button>
            <Button onClick={saveEdit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </Box>
  );
}
