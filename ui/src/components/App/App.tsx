import React from "react";
import RootLayout from "./layout";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import { SupplyMarket } from "../SupplyMarket";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BorrowMarket } from "../BorrowMarket";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// The startup page for displaying every features of the app
export function App() {
  return (
    <main>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Lending Borrowing Dapp",
              url: window.location.href,
            },
          }}
        >
          <MetaMaskUIProvider
            sdkOptions={{
              dappMetadata: {
                name: "Lending Borrowing Dapp",
                url: window.location.href,
              },
            }}
          >
            <Provider store={store}>
              <RootLayout>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <SupplyMarket />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <BorrowMarket />
                  </Grid>
                </Grid>
              </RootLayout>
            </Provider>
          </MetaMaskUIProvider>
        </MetaMaskProvider>
      </ThemeProvider>
    </main>
  );
}
