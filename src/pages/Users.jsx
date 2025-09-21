import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function UsersPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Manage user accounts and roles.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h2">Content coming soon!</Typography>
      </Box>
    </Container>
  );
}
