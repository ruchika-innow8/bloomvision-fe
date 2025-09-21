import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useOrganisations } from "../../hooks/useOrganisations";
import OrganisationTable from "./OrganisationTable";

export default function OrganisationPage() {
  const { fetchOrganisations, loading, organisations } = useOrganisations();

  useEffect(() => {
    fetchOrganisations();
  }, [fetchOrganisations]);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Organisation Users
        </Typography>
      </Box>
      
      <OrganisationTable data={organisations} loading={loading} />
    </Container>
  );
}
