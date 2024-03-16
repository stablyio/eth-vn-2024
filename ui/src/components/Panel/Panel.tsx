import { Box, styled } from "@mui/material";

export const Panel = styled('div')(({}) => ({
  background: "#ffffff",
  boxShadow: "0px 2px 4px rgba(16, 21, 24, 0.05)",
  borderRadius: "4px",
  marginBottom: "1.33rem",
}));

export const PanelHeader = styled('div')(({}) => ({
  display: "flex",
  flexFlow: "inherit",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.1rem",
  padding: "1rem 1.75rem",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
}));

export const PanelLabel = styled('div')(() => ({
  display: "flex",
  padding: "1rem 1.75rem",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  alignItems: "center",
}));

export const PanelLabelText = styled('label')(() => ({
  color: "#AAB8C1",
}))
