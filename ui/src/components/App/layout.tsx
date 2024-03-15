"use client"
import { Box } from "@mui/material"
import "./globals.css";
import { Header } from "../Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header position={"absolute"} />
      {children}
    </Box>
  );
}
