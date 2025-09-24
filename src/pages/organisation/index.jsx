import React, { useEffect, useRef } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useOrganisations } from "../../hooks/useOrganisations";
import OrganisationTable from "./OrganisationTable";

export default function OrganisationPage() {
  const { fetchOrganisations, loading, organisations } = useOrganisations();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchOrganisations();
      hasFetched.current = true;
    }
  }, [fetchOrganisations]);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <OrganisationTable data={organisations} loading={loading} />
    </Container>
  );
}
