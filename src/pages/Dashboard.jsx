// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const dashboardCards = [
    {
      title: "Organisations",
      description: "Manage organisation users and settings",
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      action: () => navigate("/organisation"),
    },
    {
      title: "Users",
      description: "View and manage user accounts",
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      action: () => console.log("Users clicked"),
    },
    {
      title: "Analytics",
      description: "View system analytics and reports",
      icon: <AssessmentIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      action: () => console.log("Analytics clicked"),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || "User"}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your BloomVision admin panel today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
              onClick={card.action}
            >
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {card.description}
                </Typography>
                <Button variant="outlined" size="small">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
