import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Alert,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import Dialog from "./Dialog";

// Flower template data provided by the user
const FLOWER_TEMPLATES = [
  // Centerpiece
  {
    id: "04c70558-d317-4def-b1fe-e24a892df2b4",
    category: "Centerpiece",
    name: "Low Poppy centerpiece",
  },
  {
    id: "0b5aad8f-ae17-4cf3-ad93-b4a56f6a3db0",
    category: "Centerpiece",
    name: "Lush and Large Rounded Elevated Centerpiece",
  },
  {
    id: "14bbd5a7-7d24-4ae2-adf5-94b819dca193",
    category: "Centerpiece",
    name: "Petite Frog Arrangement",
  },
  {
    id: "375b9b06-fa65-482e-9808-a4995c32c62c",
    category: "Centerpiece",
    name: "Simple Garden Compote",
  },
  {
    id: "50d98ec5-08af-4520-856d-1047417fb4a0",
    category: "Centerpiece",
    name: "Garden Compote",
  },
  {
    id: "65026dae-b086-4fd1-a7b0-d7ea01db2ff9",
    category: "Centerpiece",
    name: "Low Rounded Centerpiece",
  },
  {
    id: "73f9dbed-e10c-493b-8eb3-dac8679e0026",
    category: "Centerpiece",
    name: "Hanging Chandelier Oval",
  },
  {
    id: "8272c47c-23bf-436e-ae25-3286ca7d5fa0",
    category: "Centerpiece",
    name: "Centerpiece",
  },
  {
    id: "82b44614-36f2-4f5b-aeb6-db5cb5cce0da",
    category: "Centerpiece",
    name: "Poppy Tall White Centerpiece",
  },
  {
    id: "89dd757c-8acb-4fa8-97a5-5f86af873de9",
    category: "Centerpiece",
    name: "Lush and Large Rounded Elevated Centerpiece with Base Florals",
  },
  {
    id: "ca6d2f61-1c80-48d9-a296-5212bdd29a45",
    category: "Centerpiece",
    name: "Monofloral Runner Centerpiece",
  },
  {
    id: "e57450ed-124e-4da9-94dc-a6de4fe92c83",
    category: "Centerpiece",
    name: "Dancing Garden Compote",
  },
  {
    id: "f2399695-53db-49ac-bdac-1df44b6a3489",
    category: "Centerpiece",
    name: "8ft Table Garden Centerpiece",
  },
  {
    id: "f705f93b-44aa-419c-ac8f-e6cb7261c7f8",
    category: "Centerpiece",
    name: "Movement Centerpiece",
  },

  // Bouquet
  {
    id: "0d587e97-aee8-4331-ac46-68844513f73b",
    category: "Bouquet",
    name: "Dancing Garden Bouquet (Ribbon)",
  },
  {
    id: "3868ac5f-b6f8-4443-a81a-e46e85118c4f",
    category: "Bouquet",
    name: "Dancing Garden Bouquet (Stem)",
  },
  {
    id: "5a6c5992-3c9c-4c1a-a6c5-5530a117a011",
    category: "Bouquet",
    name: "MonoMedium",
  },
  {
    id: "5cf62703-0fd6-4e58-b689-f3e304e8087d",
    category: "Bouquet",
    name: "Poppy Bouquet",
  },
  {
    id: "6004fd63-f353-4f69-a7a8-c0b203431b6c",
    category: "Bouquet",
    name: "Bouquet",
  },
  {
    id: "83ed103c-9ca9-4a52-9ea6-7e1071bc7760",
    category: "Bouquet",
    name: "Petite Mono Floral",
  },
  {
    id: "89c65937-ae4c-444d-b5b2-25589b5a4790",
    category: "Bouquet",
    name: "Mixed Garden Round Bouquet",
  },
  {
    id: "cae4d955-a091-4057-97c2-94cacf8b3d52",
    category: "Bouquet",
    name: "MonoLarge",
  },
  {
    id: "ddff5258-be15-4517-a1af-d318d9c61fff",
    category: "Bouquet",
    name: "Small Single Flower Bouquet Petite",
  },
  {
    id: "e5dea4a2-7d6c-4a52-9554-8f79c7e3589e",
    category: "Bouquet",
    name: "Structure Bouquet",
  },
  {
    id: "ea9724a9-4683-4ca3-92a8-21134efa0fc9",
    category: "Bouquet",
    name: "Modern Cascade Bouquet",
  },
  {
    id: "f5a09e08-0d3e-4e69-9361-b8052161b009",
    category: "Bouquet",
    name: "Garden Bouquet",
  },
  {
    id: "f97869b1-f341-4ff4-9764-d6205f57f317",
    category: "Bouquet",
    name: "Long Stem Bouquet",
  },

  // Ceremony
  {
    id: "0a40b4db-0184-46a3-9340-db8b35359db6",
    category: "Ceremony",
    name: "Full Floral Arbor",
  },
  {
    id: "28059830-0769-48cc-9bf3-aa769ee59ad0",
    category: "Ceremony",
    name: "Garden Arc",
  },
  {
    id: "31e03f04-7a67-4134-a3bf-e056b99f6c26",
    category: "Ceremony",
    name: "Structured Aisle Arrangement",
  },
  {
    id: "5be1cf7d-887d-4cbf-b3d5-a8957aff0a26",
    category: "Ceremony",
    name: "Small Aisle Garden",
  },
  {
    id: "65d8f899-41b5-4d65-ae4e-a5e372ebfc89",
    category: "Ceremony",
    name: "Garden Ceremony Urn",
  },
  {
    id: "a0347c07-f50d-4b66-bb92-534ccf3fb053",
    category: "Ceremony",
    name: "Modern Structured Chuppah",
  },
  {
    id: "e4c115cf-9a9c-4db0-8f89-28f00d17c111",
    category: "Ceremony",
    name: "Grassy Ground Ceremony",
  },
];

const TemplateAccessModal = ({
  open,
  onClose,
  onSave,
  organisations, // Changed from organisation to organisations
  title = "Control Template Access",
  isLoading = false,
  onRefreshOrganisations, // Add this prop
}) => {
  const [selectedTemplates, setSelectedTemplates] = useState(new Set());
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(["Centerpiece", "Bouquet", "Ceremony"])
  );
  const [error, setError] = useState("");

  // Group templates by category
  const templatesByCategory = FLOWER_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  // Initialize selected templates when modal opens
  useEffect(() => {
    if (open && organisations && organisations.length > 0) {
      // For bulk operations, we'll show all templates and let user choose
      // In the future, you could implement logic to show intersection/union of selected templates
      setSelectedTemplates(new Set());
      setExpandedCategories(new Set(["Centerpiece", "Bouquet", "Ceremony"]));
      setError("");
    }
  }, [open, organisations]);

  const handleClose = () => {
    if (!isLoading) {
      setSelectedTemplates(new Set());
      setExpandedCategories(new Set(["Centerpiece", "Bouquet", "Ceremony"]));
      setError("");
      onClose();
    }
  };

  const handleCategoryToggle = (category) => {
    const categoryTemplates = templatesByCategory[category];
    const categoryIds = categoryTemplates.map((t) => t.id);
    const allSelected = categoryIds.every((id) => selectedTemplates.has(id));

    if (allSelected) {
      // Deselect all in category
      const newSelected = new Set(selectedTemplates);
      categoryIds.forEach((id) => newSelected.delete(id));
      setSelectedTemplates(newSelected);
    } else {
      // Select all in category
      const newSelected = new Set(selectedTemplates);
      categoryIds.forEach((id) => newSelected.add(id));
      setSelectedTemplates(newSelected);
    }
  };

  const handleTemplateToggle = (templateId) => {
    const newSelected = new Set(selectedTemplates);
    if (newSelected.has(templateId)) {
      newSelected.delete(templateId);
    } else {
      newSelected.add(templateId);
    }
    setSelectedTemplates(newSelected);
  };

  const handleCategoryExpandToggle = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSave = async () => {
    if (!organisations || organisations.length === 0) return;

    try {
      setError("");

      // For bulk operations, we'll use the first organisation's trial_ends as reference
      // In a more sophisticated implementation, you could let users choose different trial dates for each org
      const referenceOrg = organisations[0];
      const payload = {
        skeletons: Array.from(selectedTemplates),
        trial_ends: referenceOrg.trial_ends || referenceOrg.trial_end,
        owner_id: referenceOrg.owner?.id || referenceOrg.owner_id,
      };

      await onSave(payload);

      // Call refresh callback after successful save to get updated data
      if (onRefreshOrganisations) {
        await onRefreshOrganisations();
      }

      onClose();
    } catch (error) {
      setError(error.message || "Failed to update template access");
    }
  };

  const getCategorySelectedCount = (category) => {
    const categoryTemplates = templatesByCategory[category];
    const categoryIds = categoryTemplates.map((t) => t.id);
    return categoryIds.filter((id) => selectedTemplates.has(id)).length;
  };

  const getCategoryTotalCount = (category) => {
    return templatesByCategory[category]?.length || 0;
  };

  const actions = (
    <>
      <Button onClick={handleClose} variant="outlined" disabled={isLoading}>
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        variant="contained"
        disabled={isLoading}
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
      maxWidth="md"
      fullWidth
      disableBackdropClick={isLoading}
    >
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Managing template access for:{" "}
          {organisations.length === 1 ? (
            <strong>{organisations[0]?.business_name}</strong>
          ) : (
            <Box component="span">
              <strong>{organisations.length} organisations</strong>
              <Box sx={{ mt: 1, maxHeight: "200px", overflow: "auto" }}>
                {organisations.map((org) => (
                  <Box key={org.id} sx={{ fontSize: "0.875rem" }}>
                    • {org.business_name}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
          {Object.keys(templatesByCategory).map((category) => (
            <Box
              key={category}
              sx={{ mb: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
            >
              {/* Category Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "#f8f9fa",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Checkbox
                  checked={
                    getCategorySelectedCount(category) ===
                    getCategoryTotalCount(category)
                  }
                  indeterminate={
                    getCategorySelectedCount(category) > 0 &&
                    getCategorySelectedCount(category) <
                      getCategoryTotalCount(category)
                  }
                  onChange={() => handleCategoryToggle(category)}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {category} ({getCategorySelectedCount(category)}/
                  {getCategoryTotalCount(category)})
                </Typography>
                <IconButton
                  onClick={() => handleCategoryExpandToggle(category)}
                  size="small"
                >
                  {expandedCategories.has(category) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              </Box>

              {/* Category Content */}
              <Collapse in={expandedCategories.has(category)}>
                <Box sx={{ p: 1 }}>
                  <FormGroup>
                    {templatesByCategory[category].map((template) => (
                      <FormControlLabel
                        key={template.id}
                        control={
                          <Checkbox
                            checked={selectedTemplates.has(template.id)}
                            onChange={() => handleTemplateToggle(template.id)}
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {template.name}
                          </Typography>
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem",
                          },
                          ml: 2,
                        }}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Selected templates: {selectedTemplates.size}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default TemplateAccessModal;
