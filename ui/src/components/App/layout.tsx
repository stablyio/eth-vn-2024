import { Box } from "@mui/material";
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
        flexDirection: "column",
        minHeight: "100vh",
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <Header />
      {children}
    </Box>
  );
}
