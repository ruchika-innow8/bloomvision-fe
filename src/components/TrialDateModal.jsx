import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Dialog from "./Dialog";

const TrialDateModal = ({
  open,
  onClose,
  onSave,
  organisation,
  field = "trial_ends",
  title = "Edit Trial Date",
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize date when modal opens or organisation changes
  useEffect(() => {
    if (open && organisation) {
      const currentValue = organisation[field];
      const dateValue = currentValue ? dayjs(currentValue) : dayjs();
      setSelectedDate(dateValue);
      setErrors({});
    }
  }, [open, organisation, field]);

  const handleSave = async () => {
    if (!selectedDate) {
      setErrors({ date: "Please select a date" });
      return;
    }

    try {
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      // Prepare the API payload according to the specification
      const payload = {
        skeletons: organisation.skeletons || [], // Use existing skeletons from the organization
        [field]: formattedDate,
        owner_id: organisation.owner?.id || organisation.owner_id,
      };

      await onSave(payload);
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setErrors({});
    onClose();
  };

  const getFieldLabel = () => {
    switch (field) {
      case "trial_ends":
        return "Trial End Date";
      case "trial_starts":
        return "Trial Start Date";
      default:
        return "Trial Date";
    }
  };

  const actions = (
    <>
      <Button onClick={handleClose} variant="outlined" disabled={isLoading}>
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        variant="contained"
        disabled={!selectedDate || isLoading}
        sx={{
          minWidth: 100,
          position: "relative",
        }}
      >
        {isLoading ? (
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
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={title}
      actions={actions}
      maxWidth="xs"
      disableBackdropClick={isLoading}
    >
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Editing trial date for: <strong>{organisation?.business_name}</strong>
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={getFieldLabel()}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              if (errors.date) {
                setErrors({});
              }
            }}
            disablePast
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date || "",
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </Dialog>
  );
};

export default TrialDateModal;
