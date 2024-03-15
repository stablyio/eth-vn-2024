import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { MetamaskButton } from "./MetamaskButton";

interface HeaderProps {
  position?:
    | "fixed"
    | "absolute"
    | "relative"
    | "static"
    | "sticky"
    | undefined;
}

export const Header = ({ position }: HeaderProps) => {
  return (
    <AppBar
      position={position ?? "relative"}
      color="transparent"
      sx={{ boxShadow: "none" }}
      data-testid="menu"
    >
      <Box bgcolor={"blackLighter"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MetamaskButton></MetamaskButton>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};
