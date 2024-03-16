import { Box, styled } from "@mui/material";

export const Panel = styled("div")(({}) => ({
  background: "#ffffff",
  boxShadow: "6px 6px 6px rgba(16, 21, 24, 0.05)",
  borderRadius: "4px",
  marginBottom: "1.33rem",
}));

export const PanelHeader = styled("div")(({}) => ({
  display: "flex",
  flexFlow: "column",
  alignItems: "start",
  justifyContent: "space-between",
  fontSize: "1.1rem",
  padding: "1rem 1.75rem",
  borderBottom: "3px solid rgba(0, 0, 0, 0.05)",
}));

export const PanelHeaderDesc = styled("h5")(() => ({
  color: "gray",
  margin: "0px",
}));

export const PanelLabel = styled("div")(() => ({
  display: "flex",
  padding: "1rem 1.75rem",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  alignItems: "center",
}));

export const PanelLabelText = styled("label")(() => ({
  color: "#AAB8C1",
}));

export const PanelRow = styled("div")(() => ({
  padding: "1rem 1.75rem",
}));
