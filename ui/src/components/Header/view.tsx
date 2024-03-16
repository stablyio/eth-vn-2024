import { AppBar, Box, Container, Stack, Toolbar } from "@mui/material";
import { MetamaskButton } from "./MetamaskButton";
import stablyLogo from "../../../public/icons/stably_logo.png";

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
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <img src={stablyLogo} alt="logo" style={{ maxHeight: "32px" }} />
              <MetamaskButton></MetamaskButton>
            </Stack>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};
