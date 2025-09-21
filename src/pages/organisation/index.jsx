import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
} from "@mui/material";
import { fetchOrganisations } from "../../store/slices/organisationSlice";
import OrganisationTable from "./OrganisationTable";

export default function OrganisationPage() {
  const dispatch = useDispatch();
  const { organisations, loading, error } = useSelector(
    (state) => state.organisation
  );

  useEffect(() => {
    dispatch(fetchOrganisations());
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading organisations: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Organization Users
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ overflow: "hidden" }}>
        <OrganisationTable data={organisations} />
      </Paper>
    </Container>
  );
}
