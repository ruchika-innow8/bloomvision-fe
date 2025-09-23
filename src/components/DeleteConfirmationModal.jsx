import React from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import Dialog from "./Dialog";

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  itemName,
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  severity = "error",
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const actions = (
    <>
      <Button
        onClick={onClose}
        variant="outlined"
        disabled={isLoading}
        sx={{ minWidth: 100 }}
      >
        {cancelText}
      </Button>
      <Button
        onClick={handleConfirm}
        variant="contained"
        color={severity}
        disabled={isLoading}
        sx={{
          minWidth: 120,
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
            Deleting...
          </>
        ) : (
          confirmText
        )}
      </Button>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      actions={actions}
      maxWidth="xs"
    >
      <Typography variant="body1" sx={{ mt: 1 }}>
        Are you sure you want to delete <strong>{itemName}</strong>?
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </Dialog>
  );
};

export default DeleteConfirmationModal;
